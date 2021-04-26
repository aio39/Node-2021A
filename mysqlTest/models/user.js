const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize, // 매개 변ㅅ 연결 옵션으로 db.sequelize 객체를 넣어야함.
        timestamps: false, // 자동으로 createAt updateAt을 만들어줌.
        underscored: false, // 테이블과 컬럼 명을 camelScore
        modelName: 'User', // node에서 사용하는 모델명
        tableName: 'users', // 실재 db의 테이블
        paranoid: false, // deletedAt이라는 칼럼을 만들어 테스팅 후 복원 가능
        charset: 'utf8', // 한글 입력 가능 utf
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
};
