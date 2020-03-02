const { NlpManager, NerManager } = require('node-nlp');
const compromise = require('compromise');
const natural = require('natural');
var mysql = require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
   database : 'nodemysql'
});

// const connection = require('./database');

const manager = new NlpManager({ languages: ['en'], ner: { threshold: 1 }, });
const nerManager = manager.container.get('ner');

const Questions = require('../datasets/Questions.json');
const namedEntities = require('../datasets/namedEntities.json')
// const fs = require('fs');

for (let QuestionsIntent of Questions) {
    for (let question in QuestionsIntent) {
        manager.addDocument('en', question, QuestionsIntent[question])
    }
}
for(let namedEntitie of namedEntities){
    manager.addNamedEntityText(namedEntitie.entity,namedEntitie.option,namedEntitie.languages,namedEntitie.sourceTexts)
}
manager.addBetweenCondition('en', 'column',['that','have','that have','where'], ['is','as','greater','less','equal','more']);
manager.addBetweenCondition('en', 'aggColumn',["max", "maximum","highest","largest", "min", "minimum","smallest","lowest","avg", "average" , "net","cumulative",'sum'], ['of','from']);
manager.addBetweenCondition('en', 'newColumn',["update", "edit" , "overwrite" , "change"], ['to','as','in']);

// manager.addBetweenCondition('en', 'column',['have','which'], 'as');
// manager.addBetweenCondition('en', 'column',['have','which'], 'greater');
// manager.addBetweenCondition('en', 'column',['have','which'], 'less');
// manager.addBetweenCondition('en', 'column',['have','which'], 'equals');
// manager.addBetweenCondition('en', 'column',['have','which'], 'equal');



manager.addAfterLastCondition('en', 'colData', ['is','as','than','equals','equal to']);
manager.addBetweenCondition('en', 'newColData', ['as','to'],['in','where']);
manager.addBetweenCondition('en', 'attribute', ['show','display','details','select'],['from','of']);
manager.addAfterLastCondition('en', 'attribute', ['and']);
manager.addBeforeCondition('en', 'attribute', ['and']);
// manager.addAfterLastCondition('en', 'colData', 'as');
// manager.addAfterLastCondition('en', 'colData', 'than');
// manager.addAfterLastCondition('en', 'colData', 'equals');
// manager.addAfterLastCondition('en', 'colData', 'equal to');


manager.train();

const handler={

    processSentence:async function (sentence){

        try {
            
        let result  =  await manager.process('en',sentence);
        // .then(result => {
        // console.log( JSON.stringify(result,null,2));

        // console.log( JSON.stringify(result,null,2));

        let table = result.entities.filter((element)=>{
          return element.entity === 'table'
        })[0];
        let operator = result.entities.filter((element)=>{
          return element.entity === 'operator'
        })[0];
        let column = result.entities.filter((element)=>{
          return element.entity === 'column'
        })[0];
        let aggColumn = result.entities.filter((element)=>{
          return element.entity === 'aggColumn'
        })[0];
        let agg = result.entities.filter((element)=>{
          return element.entity === 'agg'
        })[0];
        let colData = result.entities.filter((element)=>{
          return element.entity === 'colData'
        })[0];
        let newColData = result.entities.filter((element)=>{
          return element.entity === 'newColData'
        })[0];
        let newColumn = result.entities.filter((element) => {
          return element.entity === 'newColumn'
        })[0];
        let attribute = result.entities.filter((element) => {
          return element.entity === 'attribute'
        })[0];

        let sql;

        if(result.intent == "select"){
            sql=`select * from ${table.option}`;
            console.log(sql);
        }

        if (result.intent == "select.var") {
          if (attribute.sourceText.includes("and")) {
              attr = attribute.sourceText.split(' and ')
              // console.log(attr)
          } else {
              attr = attribute.sourceText.split(' ')
          }
          str = attr.join(',')
          sql = `select ${str} from ${table.option}`;
      }

        if(result.intent == "select.where"){
          var data = JSON.stringify(`${colData.sourceText}`)
            sql=`select * from ${table.option} where ${column.sourceText} ${operator.option} ${data}`;
        }

        if(result.intent == "count"){
            sql=`select count(*) from ${table.option}`;
        }

        if(result.intent == "count.where"){
            sql=`select count(*) from ${table.option} where ${column.sourceText} ${operator.option} ${colData.sourceText}`;
        }

        if(result.intent == "agg"){

            sql=`select ${agg.option}(${(aggColumn.sourceText)?(aggColumn.sourceText):('*')}) from ${table.option}`;
        }

        if(result.intent == "agg.where"){

            sql=`select ${agg.option}(${(aggColumn.sourceText)?(aggColumn.sourceText):('*')}) from ${table.option} where ${column.sourceText} ${operator.option} ${colData.sourceText}`;
        }
        if(result.intent == "update.where"){
            if(!table)
              sql=`update tablename set ${newColumn.sourceText}=${newColData.sourceText} where ${column.sourceText}=${colData.sourceText}`;
            else
              var newdata = JSON.stringify(`${newColData.sourceText}`)
              var olddata = JSON.stringify(`${colData.sourceText}`)
              sql=`update ${table.option} set ${newColumn.sourceText}=${newdata} where ${column.sourceText}=${olddata}` 
          }
        
        // console.log(sql)

        return sql;


    } catch (error) {
        return error.message;
    }
        
    },
    executeQuery: async function(query){
        try{
            console.log(query);
            let results = await connection.queryAsync(query);
            results.forEach(element => { console.log(element); });           
        }catch(err){
            console.log(err.message);
            return error.message;
        }
    }
};



module.exports = handler;