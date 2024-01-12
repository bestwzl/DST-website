from flask import Blueprint, jsonify, request
from common.mysql_operate import db

student = Blueprint("student", __name__)

@student.route("/getALlStudents", methods=["GET"])
def get_all_students():
    """获取所有学生信息"""
    sql = "SELECT * FROM students"
    data = db.select_db(sql)
    print("获取所有学生信息 == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "查询成功"})

@student.route("/searchStudents", methods=["POST"])
def search_students():
    """条件查询学生信息"""
    name = request.json.get("name", "").strip()  # 姓名
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    gender = request.json.get("gender", "").strip()  # 性别
    classes = request.json.get("class", "").strip()  # 班级
    age = request.json.get("age", "")  # 年龄

    q_list = list()
    if name:
        q_list.append("name like '%{}%' ".format(name))
    if studentCode:
        q_list.append("studentCode='{}'".format(studentCode))
    if gender:
        q_list.append("gender='{}' and ".format(gender))
    if classes:
        q_list.append("class='{}' and ".format(classes))
    if age:
        q_list.append("age='{}' and ".format(age))

    if q_list:
        where_sub_sql = "WHERE " + " and ".join(q_list)
    else:
        where_sub_sql = ""

    sql = "SELECT * FROM students " + where_sub_sql

    print("============== 查询sql是 ==============： {}".format(sql))

    data = db.select_db(sql)
    print("获取 {} 信息 == >> {}".format(name, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "查询成功"})
    return jsonify({"code": "1004", "msg": "查不到相关学生的信息"})


@student.route("/creatStudent", methods=['POST'])
def creat_student():
    """新增学生"""
    name = request.json.get("name", "").strip()  # 姓名
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    gender = request.json.get("gender", "").strip()  # 性别
    classes = request.json.get("class", "").strip()  # 班级
    age = request.json.get("age", 0)  # 年龄
    if name and studentCode and classes: # 注意if条件中 "" 也是空, 按False处理
        sql1 = "SELECT studentCode FROM students WHERE studentCode = '{}'".format(studentCode)
        res1 = db.select_db(sql1)
        print("查询学号 ==>> {}".format(res1))
        if res1:
            return jsonify({"code": 2002, "msg": "该学号的学生已存在！"})
        elif not (age > 0 and age < 101):
            return jsonify({"code": 2003, "msg": "学生年龄输入有误"})
        else:
            sql3 = "INSERT INTO students(name, studentCode, gender, class, age) " \
                  "VALUES('{}', '{}', '{}', '{}', '{}')".format(name, studentCode, gender, classes, age)
            db.execute_db(sql3)
            print("新增学生信息SQL ==>> {}".format(sql3))
            return jsonify({"code": 0, "msg": "添加成功！"})
    else:
        return jsonify({"code": 2001, "msg": "学生姓名/学号/班级不能为空，请检查！！！"})

@student.route("/deleteStudent", methods=['POST'])
def user_delete():
    studentId = request.json.get("id")  # 要删除的学生的id
    sql2 = "SELECT * FROM students WHERE id = '{}'".format(studentId)
    res2 = db.select_db(sql2)
    print(sql2)
    print("根据用户名 【 {} 】 查询到用户信息 ==>> {}".format(studentId, res2))
    if not res2:  # 如果要删除的用户不存在于数据库中，res2为空
        return jsonify({"code": 3005, "msg": "要删除的学生不存在，无法进行删除，请检查！！！"})
    else:
        sql3 = "DELETE FROM students WHERE id = '{}'".format(studentId)
        db.execute_db(sql3)
        print("删除用户信息SQL ==>> {}".format(sql3))
        return jsonify({"code": 0, "msg": "删除成功！"})


@student.route("/updateStudent", methods=['POST'])
def user_update(): # id为准备修改的用户ID
    """修改学生信息"""
    name = request.json.get("name", "").strip()  # 姓名
    studentCode = request.json.get("studentCode", "").strip()  # 学号
    gender = request.json.get("gender", "").strip()  # 性别
    classes = request.json.get("class", "").strip()  # 班级
    age = request.json.get("age", 0)  # 年龄
    id = request.json.get("id")  # 被修改用户的id
    if id:
        if name and studentCode and classes: # 注意if条件中 "" 也是空, 按False处理
            sql1 = "SELECT * FROM students WHERE id = '{}'".format(id)
            res1 = db.select_db(sql1)
            print("根据用户ID 【 {} 】 查询到用户信息 ==>> {}".format(id, res1))
            sql2 = "SELECT studentCode FROM students WHERE studentCode = '{}'".format(studentCode)
            res2 = db.select_db(sql2)
            print("返回结果：{}".format(res2))
            print("查询到手机号 ==>> {}".format(res2))
            if not res1: # 如果要修改的用户不存在于数据库中，res1为空
                return jsonify({"code": 4005, "msg": "修改的用户ID不存在，无法进行修改，请检查！！！"})
            elif (res2) and (res1[0]["studentCode"] != studentCode): # 如果要修改的手机号已经存在于数据库中，res2非空
                return jsonify({"code": 4006, "msg": "学号已存在，无法进行修改，请检查！！！"})
            else:
                # 把传入的明文密码通过MD5加密变为密文
                sql3 = "UPDATE students SET name = '{}', studentCode = '{}', class = '{}', gender = '{}', age = '{}' " \
                        "WHERE id = {}".format(name, studentCode, classes, gender, age, id)
                db.execute_db(sql3)
                print("修改用户信息SQL ==>> {}".format(sql3))
                return jsonify({"code": 0, "msg": "恭喜，信息修改成功！"})
        else:
            return jsonify({"code": 2001, "msg": "学生姓名/学号/班级不能为空，请检查！！！"})
    else:
        return jsonify({"code": 2002, "msg": "缺少被修改人ID，请检查！！！"})
