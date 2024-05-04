import { DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { UserGroupTable, GroupTable, UserTable } from "../db/ColumnNames";
import Users from "../models/Users";
import Groups from "../models/Groups";
import Roles from "../models/Roles";

const UserGroup = dbConnection.define(UserGroupTable.table_name,{
    [UserGroupTable.user_id]:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Users,
            key: UserTable.id
        }
    },
    [UserGroupTable.group_id]:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Groups,
            key: GroupTable.id
        }
    },
    [UserGroupTable.role_id]:{
        type: DataTypes.INTEGER,
        allowNull:false
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

/* Groups.belongsToMany(Users,{ through: UserGroupTable.table_name, foreignKey: UserGroupTable.group_id })
Users.belongsToMany(Groups,{ through: UserGroupTable.table_name, foreignKey: UserGroupTable.user_id })
UserGroup.hasOne(Roles, {
    foreignKey: UserGroupTable.role_id,
}) */
export default UserGroup