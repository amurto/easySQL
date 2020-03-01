const { NlpManager, NerManager } = require('node-nlp');
const compromise = require('compromise');
const natural = require('natural');

const manager = new NlpManager({ languages: ['en'], ner: { threshold: 1 }, });
const nerManager = manager.container.get('ner');

const Questions = require('./Questions.json');
const namedEntities = require('./namedEntities.json')
    // const fs = require('fs');

for (let QuestionsIntent of Questions) {
    for (let question in QuestionsIntent) {
        manager.addDocument('en', question, QuestionsIntent[question])
    }
}
for (let namedEntitie of namedEntities) {
    manager.addNamedEntityText(namedEntitie.entity, namedEntitie.option, namedEntitie.languages, namedEntitie.sourceTexts)
}

// const fromEntity = nerManager.addNamedEntity('column', 'trim');
// fromEntity.addBetweenCondition('en', 'where', 'is');
// fromEntity.addAfterLastCondition('en', 'is');
// const toEntity = nerManager.addNamedEntity('colData', 'trim');
// toEntity.addBetweenCondition('en', 'is', 'where');
// toEntity.addAfterLastCondition('en', 'where');

// manager.addBetweenCondition('en', 'column', 'where', 'is');
// manager.addAfterLastCondition('en', 'column', 'have');
manager.addBetweenCondition('en', 'column', ['that', 'have', 'that have', 'where', 'whose'], ['is', 'as', 'greater', 'less', 'equal', 'more']);
manager.addBetweenCondition('en', 'aggColumn', ["max", "maximum", "highest", "largest", "min", "minimum", "smallest", "lowest", "avg", "average", "net", "cumulative", 'sum'], ['of', 'from']);
manager.addBetweenCondition('en', 'newColumn', ["update", "edit", "overwrite", "change"], ['to', 'as', 'in']);

// manager.addBetweenCondition('en', 'column',['have','which'], 'as');
// manager.addBetweenCondition('en', 'column',['have','which'], 'greater');
// manager.addBetweenCondition('en', 'column',['have','which'], 'less');
// manager.addBetweenCondition('en', 'column',['have','which'], 'equals');
// manager.addBetweenCondition('en', 'column',['have','which'], 'equal');


manager.addAfterLastCondition('en', 'colData', ['is', 'as', 'than', 'equals', 'equal to']);
manager.addBetweenCondition('en', 'newColData', ['as', 'to'], ['in', 'where']);
manager.addBetweenCondition('en', 'attribute', ['show', 'display', 'details', 'select'], ['from', 'of','all']);
manager.addAfterLastCondition('en', 'attribute', ['and']);
manager.addBeforeCondition('en', 'attribute', ['and']);
// manager.addAfterLastCondition('en', 'colData', 'as');
// manager.addAfterLastCondition('en', 'colData', 'than');
// manager.addAfterLastCondition('en', 'colData', 'equals');
// manager.addAfterLastCondition('en', 'colData', 'equal to');




// (async () => {
//     await manager.train();
//     const data = manager.export(true);
//     fs.writeFileSync('NLUManager/trainedModels/nlu-model.json', data);
// })();
let sentence = 'display all cars';
manager.train()
    .then(result => manager.process('en', sentence))
    .then(result => {
        console.log(JSON.stringify(result, null, 2));

        let table = result.entities.filter((element) => {
            return element.entity === 'table'
        })[0];
        let operator = result.entities.filter((element) => {
            return element.entity === 'operator'
        })[0];
        let column = result.entities.filter((element) => {
            return element.entity === 'column'
        })[0];
        let aggColumn = result.entities.filter((element) => {
            return element.entity === 'aggColumn'
        })[0];
        let agg = result.entities.filter((element) => {
            return element.entity === 'agg'
        })[0];
        let colData = result.entities.filter((element) => {
            return element.entity === 'colData'
        })[0];
        let newColData = result.entities.filter((element) => {
            return element.entity === 'newColData'
        })[0];
        let newColumn = result.entities.filter((element) => {
            return element.entity === 'newColumn'
        })[0];
        let attribute = result.entities.filter((element) => {
            return element.entity === 'attribute'
        })[0];

        let sql;

        if (result.intent == "select") {
            sql = `select * from ${table.option}`;
        }

        if (result.intent == "select.var") {
            if (attribute.sourceText.includes("and")) {
                attr = attribute.sourceText.split(' and ')
                console.log(attr)
            } else {
                attr = attribute.sourceText.split(' ')
            }
            str = attr.join(',')
            sql = `select ${str} from ${table.option}`;
        }

        if (result.intent == "select.where") {
            var data = JSON.stringify(`${colData.sourceText}`)
            console.log(column)
            sql = `select * from ${table.option} where ${column.sourceText} ${operator.option} ${data}`;
        }

        if (result.intent == "count") {
            sql = `select count(*) from ${table.option}`;
        }

        if (result.intent == "count.where") {
            sql = `select count(*) from ${table.option} where ${column.sourceText} ${operator.option} ${colData.sourceText}`;
        }

        if (result.intent == "agg") {
            sql = `select ${agg.option}(${(aggColumn.sourceText)?(aggColumn.sourceText):('*')}) from ${table.option}`;
        }

        if (result.intent == "agg.where") {

            sql = `select ${agg.option}(${(aggColumn.sourceText)?(aggColumn.sourceText):('*')}) from ${table.option} where ${column.sourceText} ${operator.option} ${colData.sourceText}`;
        }

        if (result.intent == "update.where") {
            if (!table)
                sql = `update tablename set ${newColumn.sourceText}=${newColData.sourceText} where ${column.sourceText}=${colData.sourceText}`;
            else
                sql = `update ${table.option} set ${newColumn.sourceText}=${newColData.sourceText} where ${column.sourceText}=${colData.sourceText}`
        }

        console.log(sql)
    })
    .then(() => {
        let arr = compromise(sentence).verbs().out('array');

        stemmer = natural.PorterStemmer;

        arr.forEach(element => {
            var stem = stemmer.stem(element);
            console.log('\n stem ', stem);
        });
    })
    // .then(()=>nreManager.findEntities(
    //     'show me data of all students that have age greater than 20',
    //     'en',
    // )
    // .then(entities => console.log('\nnre \n',entities)));