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

export const SEED_TOPICS = [
  // Day 1 · 指标解读 · 备孕期
  { title: "备孕前的TSH，到底要查几次才能相信", pain_point: "只查了一次TSH显示正常就放心备孕，但听说TSH本身有波动，不知道一次结果能不能算数", pillar: "指标解读", audience_stage: "备孕期", hook: "备孕前查了一次TSH，显示正常——你有没有想过，这个数字其实可能不算数？" },
  // Day 2 · 情绪心理 · 产后
  { title: "生完孩子情绪崩了，是产后抑郁还是甲减", pain_point: "产后总想哭、情绪不稳定、容易烦躁，不知道是心理问题还是桥本甲减在作怪", pillar: "情绪心理", audience_stage: "产后", hook: "产后一直情绪很差、容易崩溃——我以为是带娃太累，查了甲状腺才知道根因在这" },
  // Day 3 · 营养补充 · 备孕期
  { title: "备孕桥本，光补叶酸还不够，还缺这3种", pain_point: "只知道备孕要补叶酸，不知道桥本人群额外还需要补什么营养素", pillar: "营养补充", audience_stage: "备孕期", hook: "备孕补叶酸，对桥本姐妹来说可能只做对了四分之一" },
  // Day 4 · 用药问题 · 孕早期
  { title: "确认怀孕那天，优甲乐要不要马上加量", pain_point: "刚发现怀孕，不知道是否需要立刻增加优甲乐剂量，还是等下次复查再说", pillar: "用药问题", audience_stage: "孕早期", hook: "试纸两道杠的那天晚上，我盯着药盒想了很久——剂量到底要不要动" },
  // Day 5 · 运动 · 备孕期
  { title: "备孕桥本，哪些运动有帮助、哪些要避开", pain_point: "想通过运动帮助调理身体，但担心运动强度过大反而影响甲状腺，不知道怎么选", pillar: "运动", audience_stage: "备孕期", hook: "备孕期间我每天跑步5公里，后来才知道这对桥本可能是错的" },
  // Day 6 · 检查规划 · 产后
  { title: "产后这两个复查时机，很多桥本妈妈都漏掉了", pain_point: "出月子就忙着带娃，不知道产后甲状腺最关键的复查节点在什么时候", pillar: "检查规划", audience_stage: "产后", hook: "生完孩子有两次检查窗口，错过了就真的错过——桥本妈妈一定要记住" },
  // Day 7 · 压力管理 · 备孕期
  { title: "越想怀孕越怀不上，压力真的会让TSH升高吗", pain_point: "工作压力避不开，听说压力会影响甲状腺，不知道怎么在高压下保住指标", pillar: "压力管理", audience_stage: "备孕期", hook: "我当时越努力备孕，TSH反而越高——后来才明白是什么在拉高它" },
  // Day 8 · 医患沟通 · 备孕期
  { title: "每次复诊5分钟，桥本备孕该问什么才有效", pain_point: "门诊时间极短，每次都有问题没问到，出来就后悔，不知道怎么高效问诊", pillar: "医患沟通", audience_stage: "备孕期", hook: "为桥本备孕跑了好几次医院，每次都感觉没问到最想问的——后来我准备了这张清单" },
  // Day 9 · 日常管理 · 孕早期
  { title: "孕吐严重，优甲乐没法空腹吃，怎么办", pain_point: "孕早期孕吐厉害，空腹吃优甲乐更难受，和食物一起吃又怕影响吸收，进退两难", pillar: "日常管理", audience_stage: "孕早期", hook: "孕吐最严重那段时间，我根本没法空腹吃优甲乐——后来医生告诉了我一个折中的方法" },
  // Day 10 · 情绪心理 · 备孕期
  { title: "备孕那段时间，我是怎么跟焦虑和解的", pain_point: "每个月等待结果都是一次煎熬，失败一次就崩溃一次，不知道能不能坚持下去", pillar: "情绪心理", audience_stage: "备孕期", hook: "备孕第8个月，我在卫生间哭着给自己发了一条语音——那是我最崩溃的一天" },
  // Day 11 · 睡眠 · 产后
  { title: "带娃睡眠碎片化，桥本妈妈怎么保护甲状腺", pain_point: "频繁起夜喂奶，睡眠质量极差，担心长期睡不好会让桥本和甲状腺指标变差", pillar: "睡眠", audience_stage: "产后", hook: "产后3个月每晚起来4次，我发现我的TSH悄悄升高了——睡眠不够对桥本的影响比我想的大" },
  // Day 12 · 家人沟通 · 备孕期
  { title: "婆婆说桥本不是病，怎么跟不懂的家人沟通", pain_point: "婆婆不理解桥本，认为只是小问题，一直催着不要想太多，说了也不信，很崩溃", pillar: "家人沟通", audience_stage: "备孕期", hook: "婆婆说「体检指标又没多少偏差，你就是想太多了」——这句话让我难受了很久" },
  // Day 13 · 检查规划 · 孕早期
  { title: "孕8周、12周、16周，桥本孕妈哪次复查最关键", pain_point: "孕早期不知道甲状腺最该在什么时间点检查，担心选错了时机错过关键窗口", pillar: "检查规划", audience_stage: "孕早期", hook: "孕早期甲状腺复查，桥本孕妈的时机和普通孕妈不一样——你知道哪次最关键吗" },
  // Day 14 · 饮食禁忌 · 产后
  { title: "月子里婆婆天天煮海带汤，桥本妈妈能喝吗", pain_point: "坐月子被要求喝海带汤补碘，但桥本饮食有碘的限制，夹在中间不知道怎么办", pillar: "饮食禁忌", audience_stage: "产后", hook: "婆婆每天煮海带汤说补碘——桥本妈妈喝这个，到底对不对" },
  // Day 15 · 指标解读 · 孕中晚期
  { title: "孕中晚期FT3偏低但TSH正常，需要处理吗", pain_point: "孕中期化验单FT3在正常范围下限，医生说没问题，但自己看到这个数字就很担心", pillar: "指标解读", audience_stage: "孕中晚期", hook: "拿到化验单，TSH正常，但FT3在最低线——这个组合到底意味着什么" },
  // Day 16 · 压力管理 · 孕早期
  { title: "等复查结果的那几天，我用这个方法熬过来的", pain_point: "抽完血到出结果的2-3天，焦虑程度几乎没法正常工作和生活，不知道怎么撑过去", pillar: "压力管理", audience_stage: "孕早期", hook: "孕期等甲状腺复查结果的那两天，是我整个孕程里最难熬的时刻" },
  // Day 17 · 用药问题 · 孕中晚期
  { title: "孕中期TSH正常了，我能不能悄悄把药减掉", pain_point: "指标复查回来好了，还在继续吃药，很想自己减量，但又不敢，担心影响宝宝", pillar: "用药问题", audience_stage: "孕中晚期", hook: "孕中期指标终于好了，我当时也动过悄悄停药的念头——还好没有" },
  // Day 18 · 情绪心理 · 孕早期
  { title: "终于怀上了，但我比备孕时还要焦虑", pain_point: "历经备孕终于怀上，却发现自己比备孕时更紧张，每天盯着症状、睡不好", pillar: "情绪心理", audience_stage: "孕早期", hook: "怀孕了，反而比备孕时更焦虑——这种感觉你有过吗" },
  // Day 19 · 营养补充 · 孕早期
  { title: "孕吐导致什么都吃不下，桥本营养素怎么补", pain_point: "孕吐严重影响饮食，担心营养跟不上，但吃什么都吐，不知道怎么维持桥本所需的营养", pillar: "营养补充", audience_stage: "孕早期", hook: "孕吐那段时间我几乎只能喝白粥——桥本需要的营养素，我是这样撑过来的" },
  // Day 20 · 运动 · 孕中晚期
  { title: "孕中晚期桥本，瑜伽和散步哪个更适合", pain_point: "孕期想保持运动帮助调理，但不知道哪种运动对桥本孕妈更友好，哪些动作要避开", pillar: "运动", audience_stage: "孕中晚期", hook: "孕期我坚持每天运动，但有一段时间选错了方式，TSH反而飘了" },
  // Day 21 · 医患沟通 · 孕中晚期
  { title: "产检时间太短，桥本孕妈要主动问这几个问题", pain_point: "每次产检只有5分钟，关于桥本的问题总没时间问完，出来就后悔", pillar: "医患沟通", audience_stage: "孕中晚期", hook: "产检排队1小时，见医生5分钟——桥本孕妈这几个问题一定要提前准备好" },
  // Day 22 · 睡眠 · 孕中晚期
  { title: "孕晚期睡不好，是桥本在拖后腿吗", pain_point: "孕晚期翻来覆去睡不着，不知道是正常的孕期现象，还是甲状腺功能影响了睡眠", pillar: "睡眠", audience_stage: "孕中晚期", hook: "孕晚期我每天凌晨2点还睡不着——后来查甲状腺才发现问题出在哪" },
  // Day 23 · 日常管理 · 产后
  { title: "带娃全乱了节奏，怎么保证每天按时吃优甲乐", pain_point: "有了孩子之后生活节奏完全被打乱，经常忘记吃优甲乐，或者和奶粉、饮食同时吃", pillar: "日常管理", audience_stage: "产后", hook: "产后半年我漏服了不知道多少次优甲乐——指标飘了才意识到这件事有多重要" },
  // Day 24 · 家人沟通 · 孕早期
  { title: "老公说别担心了，但他根本不懂桥本孕妈的焦虑", pain_point: "想让老公理解自己的担心和压力，但他总觉得是自己想多了，感觉很孤独", pillar: "家人沟通", audience_stage: "孕早期", hook: "我跟老公说我很担心桥本影响宝宝，他说「没事的别想了」——那一刻我觉得很孤独" },
  // Day 25 · 检查规划 · 备孕期
  { title: "反复备孕失败，有没有想过查一下甲状腺抗体", pain_point: "试了好几次都没成功，不知道是否和桥本抗体有关，以为只查TSH就够了", pillar: "检查规划", audience_stage: "备孕期", hook: "备孕失败好几次，一直以为是运气问题——后来查了TPO抗体才找到根因" },
  // Day 26 · 用药问题 · 产后
  { title: "断奶后，优甲乐剂量要跟着重新评估吗", pain_point: "哺乳结束了，不知道优甲乐的用量是否需要调整，还是继续照旧吃", pillar: "用药问题", audience_stage: "产后", hook: "断奶那个月我的TSH突然变了——原来哺乳期和非哺乳期，身体对优甲乐的需求不一样" },
  // Day 27 · 情绪心理 · 孕中晚期
  { title: "整个孕期我都在搜「桥本会影响宝宝吗」", pain_point: "孕期一直担心桥本抗体影响胎儿甲状腺发育，每次看到报告上的抗体数值就心跳加速", pillar: "情绪心理", audience_stage: "孕中晚期", hook: "孕期我不知道搜了多少次「桥本会影响宝宝吗」——每次答案都让我更焦虑" },
  // Day 28 · 饮食禁忌 · 备孕期
  { title: "备孕桥本，西兰花和卷心菜到底能不能吃", pain_point: "看到说十字花科蔬菜影响甲状腺，一直不敢吃，但这些菜营养很好，一直在忍", pillar: "饮食禁忌", audience_stage: "备孕期", hook: "为了桥本备孕，我有段时间连西兰花都戒掉了——后来才知道我把这件事搞错了" },
  // Day 29 · 指标解读 · 产后
  { title: "产后TSH升高了，是桥本加重了还是正常波动", pain_point: "产后复查TSH比孕前高，不知道是产后一过性波动还是桥本真的加重了，需不需要马上处理", pillar: "指标解读", audience_stage: "产后", hook: "生完孩子第一次查甲状腺，TSH比孕前高了一大截——我当晚一直没睡着" },
  // Day 30 · 医患沟通 · 产后
  { title: "产后复查桥本，挂妇科还是内分泌科", pain_point: "产后想复查甲状腺，不知道挂哪个科室，怕挂错了跑冤枉路", pillar: "医患沟通", audience_stage: "产后", hook: "生完孩子想查甲状腺——妇科？内分泌科？很多桥本妈妈挂错了科室" },
];

function seedIfEmpty(db: Database.Database) {
  const count = (db.prepare("SELECT COUNT(*) as c FROM topics").get() as { c: number }).c;
  if (count > 0) return;
  _insertSeedTopics(db);
}

function _insertSeedTopics(db: Database.Database) {
  const insertTopic = db.prepare(
    "INSERT INTO topics (title, pain_point, pillar, audience_stage, hook, status) VALUES (?, ?, ?, ?, ?, 'approved')"
  );
  const insertDay = db.prepare(
    "INSERT OR IGNORE INTO schedule_days (month, day_number, topic_id, status) VALUES (?, ?, ?, 'planned')"
  );

  db.transaction(() => {
    for (let i = 0; i < SEED_TOPICS.length; i++) {
      const t = SEED_TOPICS[i];
      const result = insertTopic.run(t.title, t.pain_point, t.pillar, t.audience_stage, t.hook);
      insertDay.run("2026-06", i + 1, result.lastInsertRowid);
    }
  })();
}

export function reseedTopics(): number {
  const db = getDb();
  db.prepare("DELETE FROM schedule_days WHERE month = '2026-06'").run();
  db.prepare("DELETE FROM topics").run();
  try { db.prepare("DELETE FROM sqlite_sequence WHERE name = 'topics'").run(); } catch {}
  try { db.prepare("DELETE FROM sqlite_sequence WHERE name = 'schedule_days'").run(); } catch {}
  _insertSeedTopics(db);
  return SEED_TOPICS.length;
}

export default getDb;
