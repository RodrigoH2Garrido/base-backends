import { BIGINT, DataTypes } from "sequelize";
import dbConnection from "../db/db";
import { InvitationStatusesTable } from "../db/ColumnNames";

const InvitationStatuses = dbConnection.define(InvitationStatusesTable.table_name,{
    [InvitationStatusesTable.id]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    [InvitationStatusesTable.name]: {
        type: DataTypes.STRING,
        allowNull: false
    },
    [InvitationStatusesTable.createdAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [InvitationStatusesTable.updatedAt]:{
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }

})

export default InvitationStatuses