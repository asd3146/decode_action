//Thu Nov 28 2024 17:52:40 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const _0x2a572a = require("axios"),
  _0x559bf2 = _0x3bab6e("快手答题"),
  _0x29f711 = ["\n", "&", "@"],
  _0x4c2f86 = ["kuaishou_dt"];
require("dotenv").config();
class _0x5ec0c9 {
  constructor(_0x5c23d6) {
    this.idx = "账号[" + ++_0x559bf2.userIdx + "]";
    this.ckFlog = true;
    this.ck_ = _0x5c23d6.split("#");
    this.ck = this.ck_[0];
    this.ua = this.ck_[1];
    this.ts13 = _0x559bf2.ts(13);
    this.hd = {
      "Host": "encourage.kuaishou.com",
      "User-Agent": this.ua,
      "X-Requested-With": "com.kuaishou.nebula",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Dest": "empty",
      "Cookie": this.ck,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
  }
  async ["userTask"]() {
    console.log("\n=============== " + this.idx + " ===============");
    this.ckFlog && (_0x559bf2.log("\n-------------- 开始答题 --------------"), await this.start_dt());
  }
  async ["start_dt"]() {
    let _0x5a048a = {
        "fn": "开始答题",
        "method": "get",
        "url": "https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/kickoff?reKickoff=false&sigCatVer=1",
        "headers": this.hd
      },
      _0x573758 = await _0x559bf2.request(_0x5a048a);
    if (_0x573758.result == 1 && _0x573758.data.roundId) {
      this.roundId = _0x573758.data.roundId;
      this.questionDetail = _0x573758.data.questionDetail;
      this.question = _0x573758.data.questionDetail.question;
      this.opt = _0x573758.data.questionDetail.options;
      this.index = _0x573758.data.questionDetail.index;
      this.total = _0x573758.data.questionDetail.total;
      await this.next(this.index, this.question, this.opt, this.roundId);
      this.ckFlog = true;
    } else {
      if (_0x573758.result == 103703) {
        _0x559bf2.log(this.idx + ": " + "开始答题" + " -- " + _0x573758.error_msg);
      } else {
        console.log("开始答题: 失败,  " + JSON.stringify(_0x573758));
        this.ckFlog = false;
      }
    }
  }
  async ["upload"](_0x38b7d9, _0x151bc2, _0x59b4ac, _0x1b706d, _0x44f34a, _0x3a64d4, _0xa65db1 = "gpt") {
    let _0x5ba37d = {
        "fn": "结果",
        "method": "post",
        "url": "https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?sigCatVer=1",
        "headers": {
          "Host": "encourage.kuaishou.com",
          "User-Agent": this.ua,
          "Accept": "*/*",
          "Origin": "https://encourage.kuaishou.com",
          "X-Requested-With": "com.kuaishou.nebula",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "Cookie": this.ck,
          "content-type": "application/json"
        },
        "json": {
          "roundId": _0x59b4ac,
          "index": _0x1b706d,
          "answer": _0x3a64d4
        }
      },
      _0x5917d0 = await _0x559bf2.request(_0x5ba37d);
    if (_0xa65db1 == "gpt") {
      if (_0x5917d0.result == 1 && _0x5917d0.data.answerDetail.correct) {
        {
          if (_0x1b706d == 9) await this.up_qs(_0x38b7d9, _0x151bc2, _0x59b4ac, _0x44f34a), _0x559bf2.log(this.idx + ": 嗷呜嗷呜~, 10 道题全对了, 当前金币:" + _0x5917d0.data.amount.current, {
            "notify": true
          });else {
            this.roundId = _0x5917d0.data.nextQuestionDetail.roundId;
            this.questionDetail = _0x5917d0.data.nextQuestionDetail.questionDetail;
            this.question = _0x5917d0.data.nextQuestionDetail.questionDetail.question;
            this.opt = _0x5917d0.data.nextQuestionDetail.questionDetail.options;
            this.index = _0x5917d0.data.nextQuestionDetail.questionDetail.index;
            await this.up_qs(_0x38b7d9, _0x151bc2, _0x59b4ac, _0x44f34a);
            _0x559bf2.log(this.idx + ": " + _0x5ba37d.fn + " 第 " + (_0x1b706d + 1) + " 题 -- 回答正确, 上传服务器题库, 当前金币:" + _0x5917d0.data.amount.current);
            await this.next(this.index, this.question, this.opt, this.roundId);
          }
        }
      } else {
        if (_0x5917d0.result == 1 && _0x5917d0.data.answerDetail.correct == false) _0x559bf2.log(this.idx + ":  第 " + (_0x1b706d + 1) + " 题 -- 回答错误, 已经将正确答案上传服务器题库, 下次就不会错了鸭!"), await this.up_qs(_0x38b7d9, _0x151bc2, _0x59b4ac, _0x5917d0.data.answerDetail.correctAnswer), console.log(JSON.stringify(_0x5917d0));else {
          console.log(_0x5ba37d.fn + ": 失败, " + JSON.stringify(_0x5ba37d) + " " + JSON.stringify(_0x5917d0));
        }
      }
    } else {
      if (_0xa65db1 == "database") {
        if (_0x5917d0.result == 1 && _0x5917d0.data.answerDetail.correct) _0x1b706d == 9 ? _0x559bf2.log(this.idx + ": 嗷呜嗷呜~, 10 道题全对了, 当前金币:" + _0x5917d0.data.amount.current, {
          "notify": true
        }) : (this.roundId = _0x5917d0.data.nextQuestionDetail.roundId, this.questionDetail = _0x5917d0.data.nextQuestionDetail.questionDetail, this.question = _0x5917d0.data.nextQuestionDetail.questionDetail.question, this.opt = _0x5917d0.data.nextQuestionDetail.questionDetail.options, this.index = _0x5917d0.data.nextQuestionDetail.questionDetail.index, _0x559bf2.log(this.idx + ": " + _0x5ba37d.fn + " 第 " + (_0x1b706d + 1) + " 题 -- 回答正确, 当前金币:" + _0x5917d0.data.amount.current), await this.next(this.index, this.question, this.opt, this.roundId));else {
          if (_0x5917d0.result == 1 && _0x5917d0.data.answerDetail.correct == false) _0x559bf2.log(this.idx + ":  第 " + (_0x1b706d + 1) + " 题 -- 回答错误, 请检查数据库答案"), console.log(JSON.stringify(_0x5917d0));else {
            console.log(_0x5ba37d.fn + ": 失败, " + JSON.stringify(_0x5ba37d) + " " + JSON.stringify(_0x5917d0));
          }
        }
      }
    }
  }
  async ["next"](_0x4a1ed0, _0x1e6a9d, _0x4f8ca4, _0x134c1e) {
    _0x559bf2.log("\n\n\n" + this.idx + ":  第 " + (_0x4a1ed0 + 1) + " 题, 问题:" + _0x1e6a9d + " -- 选项:[" + this.opt + "]");
    _0x559bf2.log(this.idx + ": 开始查询数据库...");
    let _0x179724 = await this.checkDatabase(_0x1e6a9d, _0x4f8ca4);
    if (_0x179724) {
      if (_0x4f8ca4.indexOf(_0x179724.answer) > -1) {
        let _0x4736c0 = _0x4f8ca4.indexOf(_0x179724.answer),
          _0x561577 = _0x179724.answer;
        await _0x559bf2.wait(_0x559bf2.randomInt(3, 5));
        await this.upload(_0x1e6a9d, _0x4f8ca4, _0x134c1e, _0x4a1ed0, _0x561577, _0x4736c0, "database");
      } else {
        try {
          _0x559bf2.log(this.idx + ": gpt 时间...");
          let _0x329a60 = await this.to_gpt(_0x1e6a9d, _0x4f8ca4),
            _0x2db6c2 = _0x329a60.index,
            _0x49ed2d = _0x329a60.answer;
          await this.upload(_0x1e6a9d, _0x4f8ca4, _0x134c1e, _0x4a1ed0, _0x49ed2d, _0x2db6c2, "gpt");
        } catch (_0xbc16c5) {
          console.log(_0xbc16c5);
        }
      }
    } else {
      {
        _0x559bf2.log(this.idx + ": 开始查询数据库(2)...");
        let _0x1cce6d = await this.checkDatabase_2(_0x1e6a9d, _0x4f8ca4);
        if (_0x1cce6d && _0x4f8ca4.indexOf(_0x1cce6d) > -1) {
          {
            let _0x31431d = _0x4f8ca4.indexOf(_0x1cce6d),
              _0x1a8190 = _0x1cce6d;
            await _0x559bf2.wait(_0x559bf2.randomInt(3, 5));
            await this.upload(_0x1e6a9d, _0x4f8ca4, _0x134c1e, _0x4a1ed0, _0x1a8190, _0x31431d, "gpt");
          }
        } else try {
          {
            _0x559bf2.log(this.idx + ": gpt 时间...");
            let _0x8b3e20 = await this.to_gpt(_0x1e6a9d, _0x4f8ca4),
              _0x29e9d2 = _0x8b3e20.index,
              _0x19811f = _0x8b3e20.answer;
            await this.upload(_0x1e6a9d, _0x4f8ca4, _0x134c1e, _0x4a1ed0, _0x19811f, _0x29e9d2, "gpt");
          }
        } catch (_0xd0e8a) {
          console.log(_0xd0e8a);
        }
      }
    }
  }
  async ["to_gpt"](_0x309e96, _0x51d8fb) {
    let _0x5cdbb1 = "你是一个答题机器人,我会给你题目以及选项,你直接回答正确答案的即可,  需回答题目: " + _0x309e96 + ",  题目选项:" + _0x51d8fb + ";请返回我正确答案;使用以下json字符串格式返回:{answer:xxxxx}";
    try {
      let _0x23a4aa = await this.gpt1(_0x5cdbb1);
      if (typeof _0x23a4aa == "object") {
        {
          let _0x42e8d8 = _0x23a4aa.answer;
          if (_0x51d8fb.includes(_0x42e8d8)) {
            answer_index = _0x51d8fb.indexOf(_0x42e8d8);
            console.log("gpt 选择答案: 本次选择 " + answer_index + "--" + _0x42e8d8);
            console.log({
              "index": answer_index,
              "answer": _0x42e8d8
            });
            return {
              "index": answer_index,
              "answer": _0x42e8d8
            };
          } else {
            let _0x2ebcc2 = _0x559bf2.randomInt(0, 3);
            console.log("gpt 不行了--1 开始随机答案: 本次选择" + _0x2ebcc2);
            return {
              "index": _0x2ebcc2,
              "answer": _0x51d8fb[_0x2ebcc2]
            };
          }
        }
      } else {
        {
          if (typeof _0x23a4aa == "string") {
            function _0x4e6769(_0x21487c) {
              const _0x1acae5 = /"answer".*:.*"(.*)"/gm,
                _0x1d70d7 = _0x21487c.match(_0x1acae5);
              if (_0x1d70d7) {
                {
                  const _0x1ce751 = _0x1d70d7[0];
                  return "{" + _0x1ce751 + "}";
                }
              } else {
                return false;
              }
            }
            if (_0x4e6769(_0x23a4aa)) {
              {
                let _0x235189 = JSON.parse(_0x4e6769(_0x23a4aa)),
                  _0x262cea = _0x235189.answer;
                if (_0x51d8fb.includes(_0x262cea)) {
                  let _0x5161c6 = _0x51d8fb.indexOf(_0x262cea);
                  console.log("gpt 选择答案: 本次选择 " + _0x5161c6 + "--" + _0x262cea);
                  console.log({
                    "index": _0x5161c6,
                    "answer": _0x262cea
                  });
                  return {
                    "index": _0x5161c6,
                    "answer": _0x262cea
                  };
                } else {
                  let _0x132589 = _0x559bf2.randomInt(0, 3);
                  console.log("gpt 不行了 开始随机答案: 本次选择" + _0x132589);
                  return {
                    "index": _0x132589,
                    "answer": _0x51d8fb[_0x132589]
                  };
                }
              }
            } else {
              for (let _0x54d59e of _0x51d8fb) {
                function _0x481693(_0x105c71, _0x51fd12) {
                  return _0x51fd12.includes(_0x105c71);
                }
                let _0xc4fdc4 = _0x481693(_0x54d59e, _0x23a4aa);
                if (_0xc4fdc4) {
                  let _0x5d0a19 = _0x54d59e,
                    _0x481551 = _0x51d8fb.indexOf(_0x5d0a19);
                  console.log("gpt 选择答案: 本次选择 " + _0x481551 + "--" + _0x5d0a19);
                  console.log({
                    "index": _0x481551,
                    "answer": _0x5d0a19
                  });
                  return {
                    "index": _0x481551,
                    "answer": _0x5d0a19
                  };
                } else {
                  let _0x1ae985 = _0x559bf2.randomInt(0, 3);
                  console.log("gpt 不行了 --2 开始随机答案: 本次选择 " + _0x1ae985);
                  return {
                    "index": _0x1ae985,
                    "answer": _0x51d8fb[_0x1ae985]
                  };
                }
              }
            }
          } else {
            if (_0x23a4aa == undefined) {
              {
                let _0xfaafd8 = _0x559bf2.randomInt(0, 3);
                console.log("gpt 不行了 --3 开始随机答案: 本次选择" + _0xfaafd8);
                return {
                  "index": _0xfaafd8,
                  "answer": _0x51d8fb[_0xfaafd8]
                };
              }
            } else {
              let _0x20bcae = _0x559bf2.randomInt(0, 3);
              console.log("gpt 不行了 --4 开始随机答案: 本次选择" + _0x20bcae);
              return {
                "index": _0x20bcae,
                "answer": _0x51d8fb[_0x20bcae]
              };
            }
          }
        }
      }
    } catch (_0x18c877) {
      console.log(_0x18c877);
    }
  }
  async ["checkDatabase"](_0x29bccf, _0x1c1ec6) {
    const _0x4586f1 = {
      "method": "get",
      "url": "http://117.78.6.26:9398/answer?question=" + _0x29bccf,
      "headers": {
        "Content-Type": "application/json"
      }
    };
    let _0x398e9b = await _0x559bf2.request(_0x4586f1);
    return _0x398e9b.code == 200 ? (_0x559bf2.log(this.idx + ": " + this.question + "   ❀❀❀数据库支援来了❀❀❀ "), _0x398e9b.data) : (_0x559bf2.log(this.idx + ": " + this.question + " 数据库没有这个题"), false);
  }
  async ["checkDatabase_2"](_0x2ca792, _0x206945) {
    let _0x25c1a3 = _0x2ca792.replace("？", "?");
    const _0x54ad2a = {
      "method": "post",
      "url": "http://117.78.6.26:9398/ksjsb/v2/question",
      "headers": {
        "Content-Type": "application/json",
        "voucherCode": "666"
      },
      "json": {
        "str": _0x25c1a3
      }
    };
    let _0x5d9848 = await _0x559bf2.request(_0x54ad2a);
    if (_0x5d9848.code == 200) return _0x559bf2.log(this.idx + ": " + _0x2ca792), _0x559bf2.log(this.idx + ": " + _0x2ca792 + "   ❀❀❀数据库(2)支援来了❀❀❀ "), _0x5d9848.data;else {
      if (_0x5d9848.code == 404) {
        _0x559bf2.log(this.idx + ": " + this.question + " 数据库(2)没有这个题");
        return false;
      } else console.log("数据库: 失败,  " + JSON.stringify(_0x5d9848));
    }
  }
  async ["up_qs"](_0xdce772, _0x2ae393, _0x17d47e, _0x23b4e0) {
    const _0x4358e2 = {
      "method": "post",
      "url": "http://117.78.6.26:9398/upload",
      "headers": {
        "Content-Type": "application/json"
      },
      "json": {
        "question": _0xdce772,
        "options": _0x2ae393,
        "answer": _0x23b4e0,
        "roundId": _0x17d47e
      }
    };
    let _0x20d46e = await _0x559bf2.request(_0x4358e2);
    if (_0x20d46e.code == 200 && _0x20d46e.message == "成功！") {
      _0x559bf2.log(this.idx + ": " + _0xdce772 + " -- [" + _0x2ae393 + "]; 答案:" + _0x23b4e0 + ", 上传数据库成功...");
    } else {
      if (_0x20d46e.code == 202 && _0x20d46e.message == "存在重复题目") {
        _0x559bf2.log(this.idx + ": " + _0x20d46e.message);
      } else console.log(_0x4358e2.fn + ": 失败,  " + JSON.stringify(_0x20d46e));
    }
  }
  async ["gpt1"](_0x5c254c) {
    const _0x52e5c9 = require("got"),
      _0x51eaf4 = {
        "method": "post",
        "url": "https://www.gaosijiaoyu.cn/message",
        "headers": {
          "Accept": "*/*",
          "Accept-Language": "zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Origin": "https://www.zaiwen.top",
          "Pragma": "no-cache",
          "Referer": "https://www.zaiwen.top/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "Content-Type": "application/json"
        },
        "json": {
          "message": [{
            "role": "user",
            "content": _0x5c254c
          }],
          "mode": "v3.5",
          "key": null
        },
        "timeout": 10000
      };
    try {
      const _0x1823fb = await _0x52e5c9(_0x51eaf4);
      return _0x1823fb.body;
    } catch (_0x1ecaac) {
      console.error("请求出错：", _0x1ecaac.message);
    }
  }
}
!(async () => {
  if (_0x559bf2.read_env(_0x5ec0c9)) {
    for (let _0x1acc5c of _0x559bf2.userList) {
      await _0x1acc5c.userTask();
    }
  }
})().catch(_0x5612b4 => console.log(_0x5612b4)).finally(() => _0x559bf2.exitNow());
function _0x3bab6e(_0x2d9d9e) {
  (function () {})();
  return new class {
    constructor(_0x4a5180) {
      this.name = _0x4a5180;
      this.startTime = Date.now();
      this.log("[" + this.name + "]开始运行");
      this.notifyStr = [];
      this.notifyFlag = true;
      this.userIdx = 0;
      this.userList = [];
      this.userCount = 0;
    }
    async ["request"](_0x42a838, _0x5134c6 = "body") {
      try {
        const _0x33728a = require("got");
        let _0x15d757 = 8000,
          _0x565d87 = 1,
          _0x50f29a = null,
          _0x430c80 = 0,
          _0x2e8926 = _0x42a838.fn || _0x42a838.url;
        _0x42a838.timeout = _0x42a838.timeout || _0x15d757;
        _0x42a838.retry = _0x42a838.retry || {
          "limit": 0
        };
        _0x42a838.method = _0x42a838?.["method"]?.["toUpperCase"]() || "GET";
        while (_0x430c80++ < _0x565d87) {
          try {
            _0x50f29a = await _0x33728a(_0x42a838);
            break;
          } catch (_0x101125) {
            _0x101125.name == "TimeoutError" ? this.log("请求超时，重试第" + _0x430c80 + "次") : this.log("");
          }
        }
        if (_0x50f29a == null) return Promise.resolve({
          "statusCode": "timeout",
          "headers": null,
          "body": null
        });
        let {
          statusCode: _0xbb3f04,
          headers: _0x1df612,
          body: _0xda50a6
        } = _0x50f29a;
        if (_0xda50a6) {
          try {
            _0xda50a6 = JSON.parse(_0xda50a6);
          } catch {}
        }
        if (_0x5134c6 == "body") {
          return Promise.resolve(_0xda50a6);
        } else {
          if (_0x5134c6 == "cookie") return Promise.resolve(_0x50f29a);else {
            if (_0x5134c6 == "hd") return Promise.resolve(_0x1df612);else {
              {
                if (_0x5134c6 == "all") return Promise.resolve([_0x1df612, _0xda50a6]);else {
                  {
                    if (_0x5134c6 == "statusCode") return Promise.resolve(_0xbb3f04);
                  }
                }
              }
            }
          }
        }
      } catch (_0x406c8c) {
        console.log(_0x406c8c);
      }
    }
    ["log"](_0x5765ed, _0xb7fa15 = {}) {
      typeof _0x5765ed == "object" && (_0x5765ed = JSON.stringify(_0x5765ed));
      let _0x470b73 = {
        "console": true
      };
      Object.assign(_0x470b73, _0xb7fa15);
      if (_0x470b73.time) {
        {
          let _0x2e5f96 = _0x470b73.fmt || "hh:mm:ss";
          _0x5765ed = "[" + this.time(_0x2e5f96) + "]" + _0x5765ed;
        }
      }
      _0x470b73.notify && this.notifyStr.push(_0x5765ed);
      _0x470b73.console && console.log(_0x5765ed);
    }
    ["read_env"](_0x5228c5) {
      require("dotenv").config();
      let _0xc65eba = _0x4c2f86.map(_0x5f0db4 => process.env[_0x5f0db4]);
      for (let _0x3e777f of _0xc65eba.filter(_0x4f4ed3 => !!_0x4f4ed3)) {
        {
          let _0x5ae17c = _0x29f711.filter(_0x4be07a => _0x3e777f.includes(_0x4be07a)),
            _0x53c823 = _0x5ae17c.length > 0 ? _0x5ae17c[0] : _0x29f711[0];
          for (let _0x3467a2 of _0x3e777f.split(_0x53c823).filter(_0x3dbb06 => !!_0x3dbb06)) {
            this.userList.push(new _0x5228c5(_0x3467a2));
          }
        }
      }
      this.userCount = this.userList.length;
      if (!this.userCount) return this.log("未找到变量，请检查变量" + _0x4c2f86.map(_0x99aed3 => "[" + _0x99aed3 + "]").join("或"), {
        "notify": true
      }), false;
      this.log("共找到" + this.userCount + "个账号");
      return true;
    }
    ["time"](_0x305b4e, _0x49dfec = null) {
      let _0x258ebe = _0x49dfec ? new Date(_0x49dfec) : new Date(),
        _0x538fe8 = {
          "M+": _0x258ebe.getMonth() + 1,
          "d+": _0x258ebe.getDate(),
          "h+": _0x258ebe.getHours(),
          "m+": _0x258ebe.getMinutes(),
          "s+": _0x258ebe.getSeconds(),
          "q+": Math.floor((_0x258ebe.getMonth() + 3) / 3),
          "S": this.padStr(_0x258ebe.getMilliseconds(), 3)
        };
      /(y+)/.test(_0x305b4e) && (_0x305b4e = _0x305b4e.replace(RegExp.$1, (_0x258ebe.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x11c0ea in _0x538fe8) new RegExp("(" + _0x11c0ea + ")").test(_0x305b4e) && (_0x305b4e = _0x305b4e.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x538fe8[_0x11c0ea] : ("00" + _0x538fe8[_0x11c0ea]).substr(("" + _0x538fe8[_0x11c0ea]).length)));
      return _0x305b4e;
    }
    async ["showmsg"]() {
      if (!this.notifyFlag) return;
      if (!this.notifyStr) {
        return;
      }
      if (!this.notifyStr.length) {
        return;
      }
      let _0x34baa1 = require("./sendNotify");
      this.log("\n============== 本次推送--By: 枫 ==============");
      await _0x34baa1.sendNotify(this.name, this.notifyStr.join("\n"));
    }
    ["padStr"](_0x4dba2c, _0x36ee97, _0x535ea8 = {}) {
      {
        let _0x1b8410 = _0x535ea8.padding || "0",
          _0x21f2e0 = _0x535ea8.mode || "l",
          _0x2953bb = String(_0x4dba2c),
          _0x3c4871 = _0x36ee97 > _0x2953bb.length ? _0x36ee97 - _0x2953bb.length : 0,
          _0x22c3b6 = "";
        for (let _0x55e84d = 0; _0x55e84d < _0x3c4871; _0x55e84d++) {
          _0x22c3b6 += _0x1b8410;
        }
        _0x21f2e0 == "r" ? _0x2953bb = _0x2953bb + _0x22c3b6 : _0x2953bb = _0x22c3b6 + _0x2953bb;
        return _0x2953bb;
      }
    }
    ["json2str"](_0x5c2c3f, _0x362b73, _0x120523 = false) {
      {
        let _0x2cbe82 = [];
        for (let _0x3ef59f of Object.keys(_0x5c2c3f).sort()) {
          {
            let _0x350184 = _0x5c2c3f[_0x3ef59f];
            _0x350184 && _0x120523 && (_0x350184 = encodeURIComponent(_0x350184));
            _0x2cbe82.push(_0x3ef59f + "=" + _0x350184);
          }
        }
        return _0x2cbe82.join(_0x362b73);
      }
    }
    ["str2json"](_0xdda284, _0x521e63 = false) {
      let _0x3635ef = {
        "Y": C
      };
      for (let _0x546ef3 of _0xdda284.split("&")) {
        if (!_0x546ef3) {
          continue;
        }
        let _0x3f4727 = _0x546ef3.indexOf("=");
        if (_0x3f4727 == -1) {
          continue;
        }
        let _0x47cddd = _0x546ef3.substr(_0x3f4727 + 1);
        if (_0x521e63) {
          _0x47cddd = decodeURIComponent(_0x47cddd);
        }
      }
      return _0x3635ef;
    }
    ["phoneNum"](_0x4ed7d6) {
      {
        if (_0x4ed7d6.length == 11) {
          let _0x25b660 = _0x4ed7d6.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
          return _0x25b660;
        } else return _0x4ed7d6;
      }
    }
    ["randomInt"](_0x90f831, _0xfbf148) {
      return Math.round(Math.random() * (_0xfbf148 - _0x90f831) + _0x90f831);
    }
    async ["yiyan"]() {
      {
        const _0x15733e = require("got");
        return new Promise(_0x3b81e4 => {
          (async () => {
            try {
              {
                const _0x2b6202 = await _0x15733e("https://v1.hitokoto.cn");
                let _0x5204fb = JSON.parse(_0x2b6202.body),
                  _0x50fb7a = "[一言]: " + _0x5204fb.hitokoto + "  by--" + _0x5204fb.from;
                _0x3b81e4(_0x50fb7a);
              }
            } catch (_0x22b769) {
              console.log(_0x22b769.res.body);
            }
          })();
        });
      }
    }
    ["ts"](_0x3f2673 = false, _0xb8d776 = "") {
      let _0x1e7ed0 = new Date(),
        _0x46238e = "";
      switch (_0x3f2673) {
        case 10:
          _0x46238e = Math.round(new Date().getTime() / 1000).toString();
          break;
        case 13:
          _0x46238e = Math.round(new Date().getTime()).toString();
          break;
        case "h":
          _0x46238e = _0x1e7ed0.getHours();
          break;
        case "m":
          _0x46238e = _0x1e7ed0.getMinutes();
          break;
        case "y":
          _0x46238e = _0x1e7ed0.getFullYear();
          break;
        case "h":
          _0x46238e = _0x1e7ed0.getHours();
          break;
        case "mo":
          _0x46238e = _0x1e7ed0.getMonth();
          break;
        case "d":
          _0x46238e = _0x1e7ed0.getDate();
          break;
        case "ts2Data":
          if (_0xb8d776 != "") {
            time = _0xb8d776;
            if (time.toString().length == 13) {
              {
                let _0xf310e9 = new Date(time + 28800000);
                _0x46238e = _0xf310e9.toJSON().substr(0, 19).replace("T", " ");
              }
            } else {
              if (time.toString().length == 10) {
                {
                  time = time * 1000;
                  let _0xb02e7b = new Date(time + 28800000);
                  _0x46238e = _0xb02e7b.toJSON().substr(0, 19).replace("T", " ");
                }
              }
            }
          }
          break;
        default:
          _0x46238e = "未知错误,请检查";
          break;
      }
      return _0x46238e;
    }
    ["randomPattern"](_0xe786a1, _0x53f2d8 = "abcdef0123456789") {
      let _0x267364 = "";
      for (let _0x394b2d of _0xe786a1) {
        _0x394b2d == "x" ? _0x267364 += _0x53f2d8.charAt(Math.floor(Math.random() * _0x53f2d8.length)) : _0x394b2d == "X" ? _0x267364 += _0x53f2d8.charAt(Math.floor(Math.random() * _0x53f2d8.length)).toUpperCase() : _0x267364 += _0x394b2d;
      }
      return _0x267364;
    }
    ["randomString"](_0x39eece, _0x955940 = "abcdef0123456789") {
      {
        let _0x587520 = "";
        for (let _0x1ef750 = 0; _0x1ef750 < _0x39eece; _0x1ef750++) {
          _0x587520 += _0x955940.charAt(Math.floor(Math.random() * _0x955940.length));
        }
        return _0x587520;
      }
    }
    ["randomList"](_0x26e875) {
      {
        let _0xe24c4b = Math.floor(Math.random() * _0x26e875.length);
        return _0x26e875[_0xe24c4b];
      }
    }
    ["wait"](_0x3fc1da) {
      _0x559bf2.log("随机等待 " + _0x3fc1da + " 秒 ...");
      return new Promise(_0x536d5e => setTimeout(_0x536d5e, _0x3fc1da * 1000));
    }
    async ["exitNow"]() {
      {
        await this.showmsg();
        let _0x1b79bd = Date.now(),
          _0x219a7e = (_0x1b79bd - this.startTime) / 1000;
        this.log("[" + this.name + "]运行结束，共运行了" + _0x219a7e + "秒");
        process.exit(0);
      }
    }
  }(_0x2d9d9e);
}