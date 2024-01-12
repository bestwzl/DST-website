from flask import Blueprint, jsonify, request
from common.mysql_operate import db
from datetime import datetime

score = Blueprint("score", __name__)


# 查询全部
@score.route("/getALlScore", methods=["GET"])
def get_all_score():
    """获取所有成绩信息"""
    sql = "SELECT * FROM score"
    data = db.select_db(sql)
    # data.session = datetime.strptime(data['session'], "%Y-%m-%d %H:%M:%S")
    # print("获取所有成绩信息 == >> {}".format(data))
    responseList = []
    for item in data:
        targetStudentCode = item["studentCode"]
        sql2 = "SELECT name, class from students WHERE studentCode={}".format(targetStudentCode)
        studentInfo = db.select_db(sql2)
        print("查询的学生信息112233_'{}':：：：：：".format(targetStudentCode), studentInfo)
        if studentInfo:
            infos = {
                "id": item["id"],
                "name": studentInfo[0]["name"],
                "class": studentInfo[0]["class"],
                "studentCode": targetStudentCode,
                "chinese": item["chinese"],
                "maths": item["maths"],
                "english": item["english"],
                "session": item["session"].strftime("%Y-%m-%d %H:%M:%S"),
            }
            print("获取成绩信息 == >> {}".format(infos))
            responseList.append(infos)
    return jsonify({"code": 0, "data": responseList, "msg": "查询成功"})


# 根据学号查学生姓名
@score.route("/getNameByStudentCode/<string:studentCode>", methods=["GET"])
def get_name_by_code(studentCode):
    """获取某个用户信息"""
    sql = "SELECT * FROM students WHERE studentCode={}".format(studentCode)
    data = db.select_db(sql)
    print("获取 {} 用户信息 == >> {}".format(studentCode, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "查询成功"})
    return jsonify({"code": "1004", "msg": "查不到相关学生的信息"})

# 条件查询
@score.route("/searchScore", methods=["POST"])
def search_score():
    """条件查询成绩信息"""
    name = request.json.get("name", "").strip()  # 姓名
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    classes = request.json.get("class", "").strip()  # 班级
    subject = request.json.get("subject", "").strip()  # 学科
    session = request.json.get("session", "")  # 考试场次
    statistics = request.json.get("statistics", "").strip()  # 统计方式
    currentPage = request.json.get("currentPage", 1)  # 第几页
    pageSize = request.json.get("pageSize", 10)  # 每页条数


    s_list = "SELECT s.id, s.studentCode, s.chinese, s.maths, s.english, s.`session`, s2.name, s2.class FROM score s , students s2"
    q_list = list() # 条件部分的拼接
    l_list = " limit {}, {}".format((currentPage - 1) * pageSize, currentPage * pageSize) # limit 部分的拼接
    where_sub_sql = ""


    if subject:
        s_list = "SELECT s.id, s.studentCode, s.{}, s.`session`,  s2.name, s2.class FROM score s , students s2".format(subject)
    else:
        s_list = "SELECT s.id, s.studentCode, s.chinese, s.maths, s.english, s.`session`,  s2.name, s2.class FROM score s , students s2"

    if statistics:
        orderType = ''
        orderField = 'chinese'
        if subject:
            orderField = subject

        if statistics == 'allMax' or statistics == 'classMax':
            orderType = 'desc'

        l_list = " order by {} {} limit {}, {}".format(orderField, orderType, (currentPage - 1) * pageSize, currentPage * pageSize) # limit 部分的拼接


    if name:
        q_list.append("s2.name like '%{}%'".format(name))
    if studentCode:
        q_list.append("s.studentCode='{}'".format(studentCode))
    if classes:
        q_list.append("s2.class='{}'".format(classes))
    if session:
        q_list.append("s.session='{}'".format(session))

    if q_list:
        where_sub_sql =" WHERE s.studentCode = s2.studentCode and " + " and ".join(q_list)
    else:
        where_sub_sql = " WHERE s.studentCode = s2.studentCode "

    joinSql = s_list + where_sub_sql + l_list




    # if q_list:
    #     where_sub_sql = "WHERE " + " and".join(q_list)
    # else:
    #     where_sub_sql = ""

    # sql = "SELECT * FROM score " + where_sub_sql  + l_list

    # print("查询sql是： {}".format(sql))
    # data = db.select_db(sql)

    print("============== 查询sql是 ==============：  {}".format(joinSql))
    data = db.select_db(joinSql)

    print("获取 {} 信息 == >> {}".format(name, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "查询成功"})
    return jsonify({"code": "1004", "msg": "查不到相关信息"})



#  新建成绩记录
@score.route("/creatScore", methods=['POST'])
def creat_score():
    """新增成绩记录"""
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    session = request.json.get("session", "").strip()  # 场次
    chinese = request.json.get("chinese", "")  # 语文
    maths = request.json.get("maths", 0)  # 数学
    english = request.json.get("english", 0)  # 英语

    if studentCode: # 注意if条件中 "" 也是空, 按False处理
        sql1 = "SELECT studentCode FROM score WHERE studentCode = '{}'".format(studentCode)
        res1 = db.select_db(sql1)
        print("查询学号 ==>> {}".format(res1))
        if res1:
            sql3 = "INSERT INTO score(studentCode, session, chinese, maths, english) " \
                  "VALUES('{}', '{}', '{}', '{}', '{}')".format(studentCode, session, chinese, maths, english)
            db.execute_db(sql3)
            print("新增学生成绩信息SQL ==>> {}".format(sql3))
            return jsonify({"code": 0, "msg": "添加成功！"})
        else:
            return jsonify({"code": 2002, "msg": "该学号的学生不存在！"})
    else:
        return jsonify({"code": 2001, "msg": "学生学号不能为空，请检查！！！"})

@score.route("/deleteScore", methods=['POST'])
def delete_score():
    scoreId = request.json.get("id")  # 要删除的成绩就记录的id
    sql2 = "SELECT * FROM score WHERE id = '{}'".format(scoreId)
    res2 = db.select_db(sql2)
    print("根据成绩id 【 {} 】 查询到考试信息 ==>> {}".format(scoreId, res2))
    if not res2:  # 如果要删除的考试记录不存在于数据库中，res2为空
        return jsonify({"code": 3005, "msg": "要删除的成绩记录不存在，无法进行删除，请检查！！！"})
    else:
        sql3 = "DELETE FROM score WHERE id = '{}'".format(scoreId)
        db.execute_db(sql3)
        print("删除用户信息SQL ==>> {}".format(sql3))
        return jsonify({"code": 0, "msg": "删除成功！"})


@score.route("/updateScore", methods=['POST'])
def update_score(): # id为准备修改的用户ID
    """修改成绩记录信息"""
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    session = request.json.get("session", "").strip()  # 场次
    chinese = request.json.get("chinese", "")  # 语文
    maths = request.json.get("maths", 0)  # 数学
    english = request.json.get("english", 0)  # 英语
    id = request.json.get("id")  # 被修改考试记录的id
    if id:
        if studentCode: # 注意if条件中 "" 也是空, 按False处理
            sql1 = "SELECT * FROM score WHERE id = '{}'".format(id)
            res1 = db.select_db(sql1)
            print("根据成绩id 【 {} 】 查询到考试信息 ==>> {}".format(id, res1))
            sql2 = "SELECT studentCode FROM score WHERE studentCode = '{}'".format(studentCode)
            res2 = db.select_db(sql2)
            print("返回结果：{}".format(res2))
            print("查询到手机号 ==>> {}".format(res2))
            if not res1: # 如果要修改的用户不存在于数据库中，res1为空
                return jsonify({"code": 4005, "msg": "修改的成绩ID不存在，无法进行修改，请检查！！！"})
            elif (res2) and (res1[0]["studentCode"] != studentCode): # 如果要修改的学号已经存在于数据库中，res2非空
                return jsonify({"code": 4006, "msg": "学号已存在，无法进行修改，请检查！！！"})
            else:
                # 把传入的明文密码通过MD5加密变为密文
                sql3 = "UPDATE score SET studentCode = '{}', session = '{}', chinese = '{}', maths = '{}', english = '{}' " \
                        "WHERE id = {}".format(studentCode, session, chinese, maths, english, id)
                db.execute_db(sql3)
                print("修改成绩信息SQL ==>> {}".format(sql3))
                return jsonify({"code": 0, "msg": "信息修改成功！"})
        else:
            return jsonify({"code": 2001, "msg": "学生学号不能为空，请检查！！！"})
    else:
        return jsonify({"code": 2002, "msg": "缺少被修改信息的ID，请检查！！！"})





@score.route('/uploadScore',methods = ['POST'])
def score_receive():
    # 获取文件对象
    print("上传所有参数：{}".format(request))
    session = request.form.get("session")
    scoreList = request.form.get("scoreList")

    print("上传文件session：{}".format(session))
    print("上传文件scoreList：{}".format(scoreList))


    # 获取参数body
    # body = request.data
    # print("上传参数：{}".format(body))
    # filename = file.filename
    # # file.save 也可保存传来的文件
    # # file.save(f'./{filename}')
    # with open(f'./{filename}','wb') as f:
    #     f.write(file.stream.read())

    return jsonify({"code": 0, "msg": "上传成功！"})

