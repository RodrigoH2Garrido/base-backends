import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { UserGroupTable, GroupTable, UserTable } from "../db/ColumnNames";
import Users from "../models/Users";
import Groups from "../models/Groups";

const UserGroup = dbConnection.define(UserGroupTable.table_name,{
    [UserGroupTable.user_id]:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [UserGroupTable.group_id]:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [UserGroupTable.createdAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [UserGroupTable.updatedAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

Groups.belongsToMany(Users,{ through: UserGroupTable.table_name })
Users.belongsToMany(Groups,{ through: UserGroupTable.table_name })


UserGroup.sync({force: true})


export default UserGroup