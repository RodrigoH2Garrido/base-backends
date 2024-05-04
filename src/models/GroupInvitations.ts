import { DataTypes } from "sequelize";
import dbConnection from "../db/db";

import { GroupInvitationTable } from "../db/ColumnNames";

const GroupInvitations = dbConnection.define(GroupInvitationTable.table_name,{
    [GroupInvitationTable.from_user]: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    [GroupInvitationTable.to_user]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [GroupInvitationTable.group_id]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [GroupInvitationTable.status_id]: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    [GroupInvitationTable.createdAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    },
    [GroupInvitationTable.updatedAt]: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => Date.now()
    }
})

export default GroupInvitations