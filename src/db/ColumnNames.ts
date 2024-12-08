export const UserTable = {
    table_name: 'users',
    id: 'id',
    name: 'name',
    last_name: 'last_name',
    nickname: 'nickname',
    phone: 'phone',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const RolTable = {
    table_name: 'roles',
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const GroupTable = {
    table_name: 'groups',
    id: 'id',
    name: 'name',
    topic: 'topic',
    created_by: 'created_by',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const UserGroupTable = {
    table_name: 'user_group',
    user_id: 'user_id',
    group_id: 'group_id',
    role_id: 'role_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const InvitationStatusesTable = {
    table_name: 'invitation_status',
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const GroupInvitationTable = {
    table_name: 'group_invitations',
    id: 'id',
    from_user: 'from_user',
    to_user: 'to_user',
    group_id: 'group_id',
    status_id: 'status_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}


export const TaskTable = {
    table_name: 'tasks',
    id: 'id',
    name: 'name',
    description: 'description',
    quantity: 'quantity',
    status_id: 'status_id',
    group_id: 'group_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const TaskStatusesTable = {
    table_name: 'task_statuses',
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
    
}

export const TaskUserTable = {
    table_name:"task_user",
    id: 'id',
    user_id:'user_id',
    task_id: 'task_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}

export const SessionsTable = {
    table_name: "sessions",
    user_id: 'user_id',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiresAt: 'expiresAt',
    device_info: 'device_info'
}