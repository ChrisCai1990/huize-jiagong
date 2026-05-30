import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath =
      process.env.DATABASE_PATH ||
      path.join(process.cwd(), "content.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
    seedIfEmpty(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      pain_point TEXT,
      pillar TEXT NOT NULL,
      audience_stage TEXT NOT NULL,
      hook TEXT,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'approved',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS schedule_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL,
      day_number INTEGER NOT NULL,
      topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'planned',
      UNIQUE(month, day_number)
    );

    CREATE TABLE IF NOT EXISTS scripts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      schedule_day_id INTEGER UNIQUE NOT NULL REFERENCES schedule_days(id) ON DELETE CASCADE,
      weixin_script TEXT,
      weixin_title TEXT,
      weixin_cover TEXT,
      xhs_script TEXT,
      xhs_title TEXT,
      xhs_tags TEXT,
      shoot_tips TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS publish_copies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      schedule_day_id INTEGER UNIQUE NOT NULL REFERENCES schedule_days(id) ON DELETE CASCADE,
      weixin_caption TEXT,
      weixin_tags TEXT,
      xhs_caption TEXT,
      xhs_tags TEXT,
      best_time TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

const SEED_TOPICS = [
  { title: "备孕前TSH要查到多少才算达标？", pain_point: "TSH在2点多，医生说正常，网上说备孕要低于2.5，到底信谁", pillar: "指标解读", audience_stage: "备孕期", hook: "姐妹们，拿到备孕前的化验单，是不是也不知道TSH那个数字到底算不算合格？" },
  { title: "确诊桥本那天，我以为这辈子不能当妈了", pain_point: "刚确诊，网上搜出来全是不好的信息，不知道未来怎么走", pillar: "情绪心理", audience_stage: "备孕期", hook: "确诊桥本那天，我在医院门口坐了很久，不知道要不要打电话告诉我妈" },
  { title: "桥本备孕到底能不能吃碘盐？", pain_point: "有人说不能，有人说能，家里人还一直催着多补碘，左右为难", pillar: "饮食禁忌", audience_stage: "备孕期", hook: "我妈说怀孕就要多补碘，我查了桥本好像不能多吃——这两个到底谁说的对？" },
  { title: "桥本备孕，什么情况下才需要吃优甲乐？", pain_point: "TPO抗体高但TSH显示正常，不知道要不要提前用药", pillar: "用药问题", audience_stage: "备孕期", hook: "桥本抗体很高，但甲功显示正常，医生说不用吃药——备孕的话，真的不需要吗？" },
  { title: "桥本备孕前，这5项指标一定要查清楚", pain_point: "备孕体检做了，但不知道桥本还需要查哪些额外的项目", pillar: "检查规划", audience_stage: "备孕期", hook: "备孕体检都做完了，你有没有漏掉这5项桥本专属的检查？" },
  { title: "桥本备孕，挂哪个科、问什么最有效？", pain_point: "去医院不知道挂什么科，见了医生又不知道问什么，每次都被两句话打发走", pillar: "医患沟通", audience_stage: "备孕期", hook: "为了桥本备孕的事跑了好几次医院，每次都感觉没问到想问的——后来我学会了这么做" },
  { title: "刚怀孕，TSH突然升高了，要紧吗？", pain_point: "孕前TSH正常，怀孕后第一次查TSH升到了3点多，非常慌", pillar: "指标解读", audience_stage: "孕早期", hook: "怀孕了第一次查甲状腺，TSH比孕前高了好多——是我吃错了什么，还是本来就会这样？" },
  { title: "怀孕了，但我比备孕时还焦虑", pain_point: "终于怀上了，但还是每天盯着指标，每次复查前都睡不着", pillar: "情绪心理", audience_stage: "孕早期", hook: "怀孕了，反而比备孕的时候更焦虑——这种感觉，你有吗？" },
  { title: "孕早期桥本，这3类食物真的要少碰", pain_point: "孕吐严重，很多东西吃不下，不知道吃什么既安全又能补充营养", pillar: "饮食禁忌", audience_stage: "孕早期", hook: "孕早期吐得什么都不想吃，但桥本又有饮食限制——我当时是这么撑过来的" },
  { title: "孕早期TSH偏高，优甲乐要马上加量吗？", pain_point: "孕早期TSH升高，医生说加量，但担心药对宝宝有影响不敢吃", pillar: "用药问题", audience_stage: "孕早期", hook: "孕期吃优甲乐，会影响宝宝吗？这是我当时最害怕的问题" },
  { title: "孕期TSH标准和平时为什么不一样？", pain_point: "孕期参考范围搞不清楚，自己查到的和医生说的对不上", pillar: "指标解读", audience_stage: "孕中晚期", hook: "孕期TSH2.8，医生说正常；孕前同样2.8，医生说要用药——为什么标准不一样？" },
  { title: "产检5分钟，桥本妈妈要主动问这些", pain_point: "每次产检时间短，出来就后悔没问到桥本相关的问题", pillar: "医患沟通", audience_stage: "孕中晚期", hook: "产检的时间太短了，关于桥本的问题根本问不完——我整理了一张问诊清单" },
  { title: "整个孕期，我都在担心桥本会影响宝宝", pain_point: "孕期一直焦虑，担心宝宝甲状腺发育有问题，睡不踏实", pillar: "情绪心理", audience_stage: "孕中晚期", hook: "整个孕期，我不知道搜了多少次『桥本会影响胎儿发育吗』" },
  { title: "孕期桥本，这3个复查时间点不能错过", pain_point: "不清楚孕期甲状腺要多久查一次，担心自己漏掉了关键节点", pillar: "检查规划", audience_stage: "孕中晚期", hook: "孕期甲状腺复查，桥本孕妈不能和普通孕妈按同一个频率来" },
  { title: "孕中期TSH正常了，优甲乐能不能减量？", pain_point: "TSH复查回来正常了，还在吃药，想自己减量但又不敢", pillar: "用药问题", audience_stage: "孕中晚期", hook: "孕中期指标好了，我当时也想着是不是可以把药悄悄减掉——医生是这么说的" },
  { title: "TPO抗体一直很高，会影响宝宝吗？", pain_point: "抗体数值几百上千，每次看到都心跳加速，不知道对宝宝意味着什么", pillar: "指标解读", audience_stage: "孕中晚期", hook: "TPO抗体超过1000，每次拿到化验单都不敢看——它到底会不会伤害宝宝？" },
  { title: "医生说桥本不影响备孕，我该直接信吗？", pain_point: "医生几句话打发走，自己查的资料和医生说的感觉有出入", pillar: "医患沟通", audience_stage: "备孕期", hook: "医生说桥本不影响备孕——这话没错，但他可能漏说了关键的后半句" },
  { title: "孕期桥本，硒要不要额外补充？", pain_point: "看到网上说补硒对桥本有帮助，但不知道孕期能不能吃、吃多少", pillar: "饮食禁忌", audience_stage: "孕中晚期", hook: "孕期能不能补硒？这个问题我被桥本姐妹问了很多次，今天统一说清楚" },
  { title: "生完孩子，桥本复查什么时候最关键？", pain_point: "出月子就忙着带娃，不知道产后甲状腺要不要复查、什么时候查", pillar: "检查规划", audience_stage: "产后", hook: "生完孩子有个检查，很多桥本妈妈都忘了——但产后这个窗口期真的错过就是错过了" },
  { title: "产后掉发疲惫情绪崩，是甲减还是正常？", pain_point: "产后掉发严重、老是累、动不动想哭，不知道是月子没坐好还是桥本加重了", pillar: "情绪心理", audience_stage: "产后", hook: "生完孩子第二个月，我每天掉一把头发，老公说这很正常，但我总觉得哪里不对" },
  { title: "哺乳期还能继续吃优甲乐吗？", pain_point: "准备喂母乳，但担心优甲乐通过母乳影响宝宝，不知道能不能继续吃", pillar: "用药问题", audience_stage: "产后", hook: "生完孩子想喂母乳，但手里还有优甲乐——这药哺乳期到底能不能吃？" },
  { title: "坐月子，婆婆的这几个做法桥本要注意", pain_point: "坐月子被要求喝浓汤、补碘、吃海带，和桥本的饮食要求有冲突不知道怎么办", pillar: "饮食禁忌", audience_stage: "产后", hook: "我婆婆坚持坐月子要多喝海带汤补碘——桥本妈妈真的可以这么吃吗？" },
  { title: "产后TSH升高，是桥本加重了吗？", pain_point: "产后复查TSH比孕前高了，不知道是一过性的还是需要处理", pillar: "指标解读", audience_stage: "产后", hook: "生完孩子查了甲状腺，TSH比孕前高了一截——医生说再观察，但我整夜没睡" },
  { title: "反复备孕失败，要不要查甲状腺抗体？", pain_point: "试了好几次都没成功，不知道是否和桥本有关系", pillar: "检查规划", audience_stage: "备孕期", hook: "备孕一年多，试了好几次都没成——你有没有想过，查一下甲状腺抗体？" },
  { title: "产后补硒，能帮助桥本恢复吗？", pain_point: "听说硒对桥本有帮助，但不知道产后哺乳期能不能补、怎么补", pillar: "用药问题", audience_stage: "产后", hook: "产后想通过补硒帮助桥本恢复——哺乳期能不能补？怎么选？我来说说我的经历" },
  { title: "产后总想哭，是产后抑郁还是甲减在作怪？", pain_point: "产后情绪很差，容易崩溃，不知道是心理问题还是甲状腺的问题", pillar: "情绪心理", audience_stage: "产后", hook: "产后一直情绪很差、容易哭——我以为是带娃太累，后来查了才知道是甲减" },
  { title: "产后复查桥本，挂妇科还是内分泌科？", pain_point: "产后想复查甲状腺，不知道应该挂哪个科室，挂错了白跑一趟", pillar: "医患沟通", audience_stage: "产后", hook: "生完孩子想查一下甲状腺——妇科？内分泌科？很多人挂错了科室" },
  { title: "桥本备孕，十字花科蔬菜到底能不能吃？", pain_point: "看到说西兰花、卷心菜对甲状腺不好，一直不敢吃，但很想吃", pillar: "饮食禁忌", audience_stage: "备孕期", hook: "为了桥本备孕，我有段时间连西兰花都不敢碰——后来才知道我把这件事搞错了" },
  { title: "孕期想换内分泌科医生，时机合适吗？", pain_point: "觉得现在的医生不够重视，想换但又担心影响治疗连续性", pillar: "医患沟通", audience_stage: "孕中晚期", hook: "孕期想换医生——这个时机到底合不合适？我当时是怎么处理的" },
  { title: "试纸阳性，桥本患者第一件事要做什么？", pain_point: "刚发现怀孕，不知道桥本患者需要比普通人多做哪些事", pillar: "检查规划", audience_stage: "孕早期", hook: "试纸两道杠，普通孕妈知道去建档——桥本孕妈在这之前，还有一件事要立刻做" },
];

function seedIfEmpty(db: Database.Database) {
  const count = (db.prepare("SELECT COUNT(*) as c FROM topics").get() as { c: number }).c;
  if (count > 0) return;

  const insertTopic = db.prepare(
    "INSERT INTO topics (title, pain_point, pillar, audience_stage, hook, status) VALUES (?, ?, ?, ?, ?, 'approved')"
  );
  const insertDay = db.prepare(
    "INSERT OR IGNORE INTO schedule_days (month, day_number, topic_id, status) VALUES (?, ?, ?, 'planned')"
  );

  const insertMany = db.transaction(() => {
    for (const t of SEED_TOPICS) {
      const result = insertTopic.run(t.title, t.pain_point, t.pillar, t.audience_stage, t.hook);
      insertDay.run("2026-06", SEED_TOPICS.indexOf(t) + 1, result.lastInsertRowid);
    }
  });
  insertMany();
}

export default getDb;
