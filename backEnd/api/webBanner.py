from flask import Blueprint, jsonify, request
from common.mysql_operate import db

banner = Blueprint("banner", __name__)


# 查询全部
@banner.route("/getBannerList", methods=["GET"])
def get_all_banner():
    sql = "SELECT * FROM website_home_banner"
    data = db.select_db(sql)
    responseList = []
    for item in data:
        infos = {
            "id": item["id"],
            "backGroundType": item["backgroundType"],
            "backGroundUrl": item["backgroundUrl"],
            "title": item["title"],
            "subTitle": item["subTitle"],
            "desc": item["desc"],
            "link": item["link"],
        }
        print("获取banner信息 == >> {}".format(infos))
        responseList.append(infos)
    return jsonify({"code": 0, "data": responseList, "msg": "查询成功"})



#  新建成绩记录
@banner.route("/addBanner", methods=['POST'])
def creat_banner():
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




@banner.route("/deleteBanner", methods=['POST'])
def delete_banner():
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






@banner.route("/updateBanner", methods=['POST'])
def update_banner(): # id为准备修改的用户ID
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
