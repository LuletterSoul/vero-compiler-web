export  function studentList () {
  return {
    code: 20000,
      "students": function({
                             _req,
                             Mock
                           }) {
    let query = _req.query;
    let className = query.className;
    let profession = query.profession;
    let limit = query.limit;
    let grade = query.grade;
    let studentKey = 'students';
    if (limit !== undefined) {
      studentKey += '|' + limit;
    } else {
      studentKey += '|50-200';
    }
    let mockConfig = {};
    mockConfig[studentKey] = [{
      studentId: "@id",
      studentName: "@cname",
      grade: function({
                        _req,
                        Mock
                      }) {
        if (grade === undefined) {
          return Mock.mock({
            "ramdomGrade|1": ['2012级', '2013级', '2014级', '2015级', '2016级', '2017级']
          }).ramdomGrade;
        } else {
          return grade;
        }
      },
      className: function({
                            _req,
                            Mock
                          }) {
        if (className === undefined) {
          return Mock.mock({
            "ramdomClassName|1": ["软工一班", "软工二班", "计科一班", "计科二班", "智能实验班", "网工一班", "网工二班"]
          }).ramdomClassName;
        } else {
          return className;
        }
      },
      profession: function({
                             _req,
                             Mock
                           }) {
        if (profession === undefined) {
          return Mock.mock({
            "ramdomProffession|1": ["软件工程", "计算机科学与技术", "人工智能", "网络工程"]
          }).ramdomProffession;
        }
        return profession;
      },
      "status|1": [{
        "key": "exectuting",
        "value": "任务进行中"
      },
        {
          "key": "unavailable",
          "value": "锁定"
        },
        {
          "key": "finished",
          "value": "任务完成"
        },
        {
          "key": "available",
          "value": "空闲"
        }
      ],
      "favorite|1": [{
        key: "已收藏",
        value: true
      },
        {
          key: "未收藏",
          value: false
        }
      ],
      finishedTaskCount: "@integer(1, 20)",
    }];
    return Mock.mock(mockConfig).students
  },
    total: 500
  }
}
