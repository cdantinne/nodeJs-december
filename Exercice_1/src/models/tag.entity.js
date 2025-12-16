const { EntitySchema, JoinTable } = require('typeorm')

module.exports = new EntitySchema({ 
    name: "Tag", // Nom utilisé dans le code (repository) 
    tableName: "tags", // Nom de la table SQL 
    columns: { 
        id: { 
            primary: true, 
            type: "int", 
            generated: true, // Auto-incrément 
        }, 
        label: { 
            type: "varchar",
            unique: true
        }
    }, 
    relations:{
        todos:{
            type:"many-to-many",
            target:"Todo",
            inverseSide:"tags",
            JoinTable : true
        }
    }
}); 