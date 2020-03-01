const { NerManager } = require('node-nlp');

const manager = new NerManager({ threshold: 0.8 });
const fromEntity = manager.addNamedEntity('fromEntity', 'trim');
fromEntity.addBetweenCondition('en', 'from', 'to');
fromEntity.addAfterLastCondition('en', 'to');
const toEntity = manager.addNamedEntity('toEntity', 'trim');
fromEntity.addBetweenCondition('en', 'to', 'from');
fromEntity.addAfterLastCondition('en', 'from');
manager.findEntities(
  'I want to travel from Barcelona to Madrid',
  'en',
).then(entities => console.log(entities));