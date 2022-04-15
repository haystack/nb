const nbLog = (sequelize, DataTypes) => {
    const NbLog = sequelize.define('nb_log', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        event: {
            type: DataTypes.ENUM,
            values: ['CLICK', 'HOVER', 'STAR', 'REPLY_REQUEST', 'BOOKMARK', 'REPLY', 'SESSION_START', 'SESSION_END', 'HIDE_HIGHLIGHT', 'SHOW_HIGHLIGHT', 'NOTIFICATION_ON', 'NOTIFICATION_OFF', 'NEW_ANNOTATION', 'SYNC_RECEIVED_ANNOTATION', 'SYNC_RECEIVED_REPLY', 'SYNC_RECEIVED_CONNECTION', 'SCROLL', 'FILTER', 'SORT']
        },
        initiator: {
            type: DataTypes.ENUM,
            values: ['NONE', 'SPOTLIGHT', 'LIST', 'HIGHLIGHT', 'NOTIFICATION_POPUP', 'NOTIFICATION_MENU']
        },
        spotlight_type: {
            type: DataTypes.ENUM,
            values: ['NONE', 'IN', 'ABOVE', 'BELLOW', 'LEFT', 'RIGHT', 'EM', 'MARGIN']
        },
        order: {
            type: DataTypes.INTEGER,
        },
        count_source_annotations: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        count_annotation_replies: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        count_online_students: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        count_online_instructors: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0.
        },
        is_sync_annotation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        has_sync_annotation: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        notification_trigger: {
            type: DataTypes.ENUM,
            values: ['NONE', 'INSTRUCTOR_COMMENTED', 'REPLY_REQUESTED', 'USER_TAGGED', 'USER_SAW_RECENT_ACTIVITY', 'USER_COMMENT_REPLIED_TO']
        },
        page_position: {
            type: DataTypes.ENUM,
            values: ['1/4', '2/4', '3/4', '4/4']
        },
        page_y_offset: {
            type: DataTypes.INTEGER,
        },
        page_height: {
            type: DataTypes.INTEGER,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['INSTRUCTOR', 'STUDENT']
        },
        applied_filter: {
            type: DataTypes.TEXT,
            unique: false,
            allowNull: true
        },
        applied_sort: {
            type: DataTypes.TEXT,
            unique: false,
            allowNull: true
        }
    },
        {
            classMethods: {
                associate: (models) => {
                    NbLog.belongsTo(models.Annotation, { as: 'Annotation', foreignKey: { name: 'annotation_id' }, onDelete: 'CASCADE' });
                    NbLog.belongsTo(models.User, { as: 'User', foreignKey: { name: 'user_id' }, onDelete: 'CASCADE' });
                    NbLog.belongsTo(models.Class, { as: 'Class', foreignKey: { name: 'class_id' }, onDelete: 'CASCADE' });
                    NbLog.belongsTo(models.Source, { as: 'Source', foreignKey: { name: 'source_id' }, onDelete: 'CASCADE' });
                }
            }
        });
    return NbLog;
};

module.exports = nbLog;