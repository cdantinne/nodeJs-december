const { EntitySchema, JoinColumn } = require('typeorm')

module.exports = new EntitySchema({ 
    name: "Todo",
    tableName: "todos",
    columns:{
        id:{
            primary: true,
            type: "int",
            generated: true
        },
        title:{
            type:"varchar"
        },
        completed:{
            type:"boolean",
            default: false
        }
    },
    relations:{
        users:{
            type:"many-to-one",
            target:"User",
            JoinColumn:true,
            inverseSide:"todos"
        },
        tags:{
            type:"many-to-many",
            target:"Tag",
            inverseSide:"todos"
        }
    }
}); 