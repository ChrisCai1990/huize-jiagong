INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (1, '姐妹们，拿到备孕前的化验单，是不是也不知道TSH那个数字到底算不算合格？

我知道很多人的感受——医生说正常，自己回去一查，网上全是「备孕TSH要低于2.5」，就开始慌。

今天给你讲清楚这件事。第一，普通人的TSH正常范围是0.4到4.5，但桥本备孕有更严的标准，大多数内分泌科医生建议控制在2.5以下，部分医生甚至建议低于2。第二，光看TSH不够，还要同时看FT4——TSH在2点几但FT4偏低，一样需要干预。第三，这个标准不是一刀切，你的年龄、抗体水平、备孕时间都会影响医生的判断。

所以啊，拿到化验单别自己吓自己，也别觉得医生说正常就万事大吉。找一个懂甲状腺的医生，把你备孕的情况说清楚，让他给你一个针对你的目标值。

你的TSH现在是多少？评论区告诉我，姐妹们一起看看。', '桥本备孕TSH要低于多少才算达标？', '备孕TSH多少才够', '拿到化验单，TSH显示在参考范围内，医生说没问题——但你在备孕，这真的够吗？

📌 普通正常 vs 备孕标准，差别很大
普通人TSH正常值是0.4～4.5，但对于桥本备孕来说，大多数生殖内分泌科医生建议TSH控制在2.5以下，更保守的建议是低于2.0。

① TSH高会影响排卵吗？
会。TSH偏高时甲状腺功能相对低下，会干扰促卵泡素分泌，影响卵泡发育质量，增加不孕和早期流产风险。

② 只看TSH够吗？
不够。要同时看FT4（游离甲状腺素）。TSH在2点几但FT4偏低，说明甲状腺已经在努力工作了，可能需要支持。

③ 抗体高但TSH正常，要不要处理？
这个需要结合你的备孕情况。TPO抗体或TgAb持续高，本身就是流产风险因素，建议和医生讨论是否需要低剂量优甲乐或补硒干预。

📌 我的建议
备孕前3个月查一次完整甲功五项（TSH+FT3+FT4+TPOAb+TgAb），带着结果去找内分泌科或生殖科医生，告诉他你在备孕，让他给你个性化的目标值。

收藏这篇，下次取化验单知道自己该怎么看👇', '🧪桥本备孕TSH到底要低于多少？医生说正常≠备孕合格', '#桥本甲状腺炎 #备孕 #TSH标准 #桥本备孕 #甲状腺备孕 #备孕指标 #甲功检查 #桥本甲状腺 #备孕准备 #甲状腺抗体 #优甲乐 #备孕攻略 #女性健康 #甲减备孕 #桥本妈妈', '景别：胸部以上半身，手持化验单或手机屏幕（显示化验单截图）作为道具引入。道具/场景：明亮室内，白色或浅绿背景，简洁。情绪节奏：开场疑问感，中间稳定讲解，结尾温和鼓励，语速适中，像在和朋友解释。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (2, '确诊桥本那天，我在医院门口坐了很久，不知道要不要打电话告诉我妈。

这是很多姐妹告诉我的感受。确诊那一刻，第一反应不是想治疗，是——我还能生孩子吗？

我想今天跟你说几句真话。第一，桥本不等于不孕。桥本是自身免疫性疾病，它会增加备孕难度，但绝大多数桥本患者是可以正常怀孕、生下健康宝宝的。第二，你在网上搜到的那些案例，往往是走了很多弯路、没有得到正确指导的情况。及早干预、正确管理，结局会很不一样。第三，焦虑本身就是桥本的敌人。情绪长期紧绷会影响免疫系统，让抗体水平更难下降。

确诊不是终点，是你开始真正了解自己身体的起点。

如果你是刚确诊的姐妹，评论区告诉我，我们一起聊聊接下来该怎么走。', '确诊桥本就不能当妈了？我想跟你说实话', '确诊桥本不等于不孕', '确诊桥本的那个下午，我把化验单截图发给闺蜜，她回了我一句「没事的」——但我根本不知道有没有事。

如果你刚刚确诊，正在翻遍网络找答案，这篇给你。

📌 你最害怕的那个问题：桥本会不会导致不孕？
直接说：桥本本身不直接导致不孕，但它带来的影响会增加难度：
① TSH偏高影响排卵和卵泡质量
② 抗体持续高会增加早期流产风险
③ 合并甲减时，子宫环境不够理想

但这些都是可以被干预和改善的。

📌 那些让你崩溃的帖子，往往在讲没被好好管理的情况
及早发现 + 正确监测 + 必要用药，大多数桥本患者可以顺利备孕、怀孕、生育。这不是安慰你，是数据告诉我们的事实。

📌 确诊之后，最重要的3件事
① 查完整甲功五项，了解现在的真实状态
② 找一个有生育需求经验的内分泌科医生建档
③ 停止在网上自我诊断——每个人的指标和情况不同

焦虑是桥本最不想要的朋友。先做能做的事，一步一步来。

刚确诊的你，在评论区告诉我现在的心情，我都看👇 收藏备用，也转给需要的姐妹。', '💚确诊桥本那天我哭了，但现在我想告诉你这些', '#桥本甲状腺炎 #确诊桥本 #桥本备孕 #桥本妈妈 #自身免疫疾病 #甲状腺 #备孕 #情绪心理 #桥本甲状腺 #甲减备孕 #女性健康 #桥本日记 #甲状腺抗体 #备孕攻略 #桥本患者', '景别：半身，眼神直视镜头，语气真诚。道具/场景：居家温暖环境，不需要医疗道具，营造「像朋友在说话」的感觉。情绪节奏：开场带一点沉重和共情，中间转向平稳有力，结尾温暖有希望感，语速稍慢，留给观众情绪消化的时间。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (3, '我妈说怀孕就要多补碘，我查了桥本好像不能多吃——这两个到底谁说的对？

这是桥本备孕里最让人纠结的问题之一，今天给你讲清楚。

第一，碘是甲状腺合成激素的原料，正常人确实需要，但桥本患者对碘非常敏感，摄入过多会刺激免疫系统，让TPO抗体升得更高，加重炎症反应。第二，「不能多吃碘」不等于「完全不能碰碘」。适量碘是没问题的，大多数医生建议桥本患者用「低碘盐」而不是「无碘盐」，炒菜正常用，但不要喝浓海带汤、大量吃紫菜这类高碘食物。第三，备孕期间碘的需求确实比平时稍高——这个量，吃普通含碘盐的饭菜基本就够了，不需要额外补碘剂，除非医生有特别指示。

所以告诉妈妈：正常吃就好，不要特意大补，但也不用谈碘色变。

你现在家里用的是含碘盐还是无碘盐？评论区说说。', '桥本备孕能吃碘盐吗？把这个视频发给你妈看', '桥本到底能吃碘吗', '婆婆给我煲了一锅浓海带汤，说「补碘对宝宝好」——我当时真的不知道该喝还是不该喝。

这篇给所有在「要补碘」和「不能吃碘」之间左右为难的桥本备孕姐妹。

📌 为什么桥本要注意碘摄入？
桥本是自身免疫性甲状腺炎，碘摄入过高会直接刺激免疫反应，导致TPO抗体升高、甲状腺炎症加重。这不是养生建议，是有研究支持的。

① 「低碘」不等于「无碘」
完全不吃碘对身体也有害，桥本患者的原则是适量。普通含碘盐正常炒菜用，问题不大。

② 这些才是真正要避开的高碘食物
· 浓海带汤（碘含量极高）
· 大量紫菜、海苔
· 海藻类保健品
· 碘补充剂（除非医生要求）

③ 备孕期碘需求稍高，怎么满足？
正常含碘盐的日常饮食，碘的摄入基本够用。如果医生评估后认为需要，会给你具体指导——不要自行购买碘剂补充。

📌 一句话总结
桥本备孕：正常含碘盐 ✅ / 大量高碘食物 ❌ / 碘补充剂（不经评估）❌

把这篇收藏起来，下次家人催你补碘，直接截图发给他们👇', '🧂桥本备孕碘盐能不能吃？终于说清楚了！', '#桥本甲状腺炎 #桥本备孕 #碘盐 #饮食禁忌 #桥本饮食 #甲状腺饮食 #备孕饮食 #碘摄入 #桥本甲状腺 #备孕攻略 #女性健康 #桥本妈妈 #甲状腺抗体 #TPO抗体 #健康饮食', '景别：半身，可以拿一袋盐或手机截图作为道具引入话题。道具/场景：厨房或餐桌旁，生活感强。情绪节奏：轻松亲切，像跟朋友解释，偶尔带点幽默感，节奏不要太快。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (4, '桥本抗体很高，但甲功显示正常，医生说不用吃药——备孕的话，真的不需要吗？

这个问题我见太多姐妹问了，今天来聊聊。

第一，优甲乐的作用是补充甲状腺激素，所以如果你TSH在备孕目标范围内（通常2.5以下），FT4也正常，那确实不需要靠优甲乐来干预。第二，但有几种情况下医生可能会建议你提前用低剂量：TSH在2.5到4之间且抗体持续很高、有反复流产史、做了ART辅助生殖准备。第三，抗体高但甲功正常，目前没有证据说明优甲乐能降低抗体——这个时候更值得关注的是补充足量维生素D、硒，以及减少炎症饮食。

简单说，要不要吃优甲乐，取决于你的TSH目标值有没有达到，不只是看抗体高不高。

你现在抗体多少、TSH是多少？评论区说，我们一起帮你分析分析。', '桥本备孕抗体高但TSH正常，到底要不要吃优甲乐', '抗体高要不要吃药', 'TPO抗体300多，但TSH只有1.8——医生说不用吃药，我回来翻帖子翻到头疼，还是不知道该不该吃。

这篇帮你理清楚逻辑。

📌 优甲乐是干什么的？
优甲乐（左甲状腺素钠）的核心作用是补充甲状腺激素，让TSH下降到合理范围。它不是消炎药，不能直接降抗体。

① 什么情况下需要用优甲乐备孕？
· TSH超过2.5（部分医生标准是2.0）
· TSH在正常偏高区间 + 有反复流产史
· 做试管或促排卵，医生要求更严格的TSH控制

② 抗体高但TSH正常，该怎么管理？
· 补充硒（每日100-200μg，有研究显示可帮助降低TPO抗体）
· 保证维生素D充足（很多桥本患者缺乏）
· 减少精制糖和高度加工食品，控制炎症
· 定期复查（每3个月一次甲功+抗体）

③ 什么时候要重新评估是否用药？
· TSH出现上升趋势
· 备孕超过6-12个月未果
· 准备进行ART前

📌 一句话原则
备孕用不用优甲乐，看TSH有没有达到目标值，不只看抗体高不高。

收藏这篇，下次复查带着它去问医生👇', '💊桥本备孕抗体高但甲功正常，要不要吃优甲乐？看完别纠结了', '#桥本甲状腺炎 #优甲乐 #桥本备孕 #甲状腺抗体 #TPO抗体 #备孕用药 #桥本妈妈 #甲功检查 #备孕攻略 #硒补充 #维生素D #桥本甲状腺 #女性健康 #甲减备孕 #备孕准备', '景别：半身，可以桌上放一盒优甲乐药盒或化验单作为视觉引入。道具/场景：简洁书桌或客厅，光线明亮。情绪节奏：开场带点笃定感，讲解段落清晰有条理，结尾温和收尾，不要制造焦虑。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (5, '备孕体检都做完了，你有没有漏掉这5项桥本专属的检查？

很多姐妹做了常规体检，医生说没问题，就以为万事俱备——但对桥本患者来说，有几项检查普通体检根本不包含。

第一，甲功五项：TSH、FT3、FT4、TPOAb、TgAb，这5个要一起查，缺一不可，单查TSH是不够的。第二，25-羟维生素D，桥本患者普遍缺乏，维生素D不足会影响免疫调节和卵泡质量。第三，血清硒水平，硒对甲状腺保护很重要，但不是每家医院都查，可以主动要求。第四，空腹血糖和胰岛素抵抗指标，桥本和多囊、胰岛素抵抗经常同时出现，备孕前值得排查。第五，如果你备孕超过6个月未果，还要加查卵巢储备功能（AMH）。

把这5项列个清单，下次去医院主动跟医生说，让他帮你开单子。

你备孕前做过这些检查吗？评论区告诉我查了几项。', '桥本备孕必查的5项指标，普通体检根本没有', '备孕必查5项指标', '备孕体检报告出来，医生说「都正常」——但你知道吗，普通体检根本不包含桥本患者最需要的那几项。

整理了一份桥本备孕专属检查清单，去医院直接对照开单👇

① 甲功五项（缺一不可）
· TSH — 评估甲状腺功能整体状态
· FT3 — 游离三碘甲腺原氨酸
· FT4 — 游离甲状腺素
· TPOAb — 甲状腺过氧化物酶抗体
· TgAb — 甲状腺球蛋白抗体
⚠️ 很多医院默认只查TSH+T3+T4，备孕要主动说「我要查甲功五项」

② 25-羟维生素D
桥本患者缺乏率极高，维生素D不足会影响免疫调节、卵泡质量，是容易被忽略的隐患。

③ 血清硒
硒有保护甲状腺、辅助降低TPO抗体的作用，摸底自己的水平才知道要不要补。

④ 空腹血糖 + 胰岛素抵抗（HOMA-IR）
桥本和代谢紊乱高度相关，很多人同时有轻度胰岛素抵抗但不自知，会影响排卵。

⑤ AMH（抗缪勒管激素）
如果备孕超过6个月，建议加查AMH评估卵巢储备，及早了解时间窗口。

📌 备孕前3个月完成这套检查，带结果去内分泌科+生殖科各看一次，效率最高。

收藏这张清单，下次去医院直接截图给医生看👇', '📋桥本备孕前必须查这5项！普通体检根本不够用', '#桥本甲状腺炎 #备孕检查 #桥本备孕 #甲功五项 #维生素D #AMH #备孕攻略 #甲状腺抗体 #桥本妈妈 #备孕准备 #女性健康 #桥本甲状腺 #卵巢储备 #胰岛素抵抗 #备孕体检', '景别：半身，手边放着一张写有清单的纸或平板显示清单，配合手势逐项讲解。道具/场景：书桌前，简洁整洁环境。情绪节奏：信息量较大，语速放慢，每项之间留半秒停顿，语气专业中带亲切。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (6, '为了桥本备孕的事跑了好几次医院，每次都感觉没问到想问的——后来我学会了这么做。

很多姐妹说，见到医生就紧张，5分钟一过什么都忘了问，或者问了医生说「没事」就出来了，还是一头雾水。

今天教你3件事。第一，挂什么科：桥本备孕，首选内分泌科，同时建议看一次生殖内分泌科，让两个科室协同评估。妇科是聊月经和妇科问题的，不适合管理桥本指标。第二，去之前准备这几个问题：我备孕的TSH目标值是多少？现在需要用药还是观察？复查频率是多久一次？怀孕后TSH的管理计划是什么？第三，如果医生三句话打发你走，你有权利追问：「我在积极备孕，能不能告诉我接下来3个月的具体计划？」

医患沟通是一项技能，练起来。不是为了和医生对抗，是为了让每一次门诊都真正有效。

你上次看诊有没有问到让你满意的答案？评论区聊聊。', '桥本备孕挂哪个科？这几个问题一定要问医生', '看诊必问这几句', '挂了号，坐下来，医生扫了一眼化验单说「正常，继续观察」——然后你就出来了，什么都没弄明白。

这不是你的问题，是没有人教过我们怎么和医生谈桥本备孕。

📌 第一步：挂对科室
· 内分泌科：管理TSH、抗体、优甲乐用量
· 生殖内分泌科：评估备孕计划、ART适应症
· 妇科：管月经问题，不负责甲状腺指标管理
✅ 建议两个科室都看一次，各有侧重

📌 第二步：这7个问题带着去问
① 我备孕的TSH目标值应该是多少？
② 现在的FT4、抗体水平需要干预吗？
③ 需要开始吃优甲乐吗？什么时候开始？
④ 怀孕后TSH的监测频率和目标值是多少？
⑤ 我需要补充硒或维生素D吗？用多少剂量？
⑥ 下次复查什么时候，查哪些项目？
⑦ 如果3个月后TSH没有变化，下一步怎么做？

📌 第三步：遇到「没事，继续观察」怎么办？
礼貌但坚定地补充：「我在积极备孕，想要一个更明确的管理计划，能帮我写下接下来3个月要怎么做吗？」

好的医患关系不是对抗，是协作。你准备得越充分，医生给你的帮助就越有针对性。

截图收藏，下次看诊对着用👇', '🏥桥本备孕去医院怎么问医生？这套问题模板直接用', '#桥本甲状腺炎 #医患沟通 #桥本备孕 #看诊技巧 #内分泌科 #生殖科 #备孕攻略 #桥本妈妈 #甲状腺 #桥本甲状腺 #女性健康 #备孕准备 #优甲乐 #TSH标准 #问诊技巧', '景别：半身，可以拿着一张写好问题的小纸条或平板作为道具。道具/场景：明亮室内，简洁背景。情绪节奏：开场有共鸣感，中间条理清晰，结尾有鼓励感，语气温和有力。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
INSERT INTO scripts (schedule_day_id, weixin_script, weixin_title, weixin_cover, xhs_script, xhs_title, xhs_tags, shoot_tips, updated_at)
VALUES (7, '怀孕了第一次查甲状腺，TSH比孕前高了好多——是我吃错了什么，还是本来就会这样？

先说：别慌，这很常见，有原因的。

孕早期TSH升高，主要有两个原因。第一，怀孕后hCG（人绒毛膜促性腺激素）水平迅速升高，它和TSH有竞争关系——孕早期hCG高的时候，TSH往往会下降；但桥本患者甲状腺储备功能本来就不足，反而可能出现TSH升高。第二，孕期对甲状腺激素的需求增加了30%到50%，如果你之前没有服用优甲乐，或者剂量不够，TSH就会往上走。

孕早期TSH的标准和备孕时不一样，大多数指南建议孕早期TSH控制在2.5以下。如果你现在TSH超过这个值，需要尽快联系你的内分泌科医生，根据情况调整优甲乐剂量，不要等下一次产检。

刚怀孕的桥本妈妈，记住：孕期TSH至少每4到6周查一次，这不是过度担心，是必要的监测。

你现在孕几周、TSH是多少？评论区说说，大家一起陪你。', '刚怀孕TSH升高不要慌，桥本妈妈必须知道这件事', '孕早期TSH升高怎么办', '孕前TSH控制得好好的，怀孕第一次查，TSH升到3点多——我当时真的傻了，以为是自己做错了什么。

这篇告诉你：这不一定是你的问题，但需要马上处理。

📌 为什么孕早期TSH会升高？

① hCG的「干扰」减少了
正常情况下，孕早期hCG（孕激素）会刺激甲状腺，让TSH暂时下降。但桥本患者甲状腺功能储备不足，这个「刺激」的效果不够，TSH反而会升。

② 孕期甲状腺激素需求大幅增加
孕期对甲状腺素的需求增加30%-50%，如果之前没有用优甲乐，或者剂量不足，TSH就会往上走。

📌 孕期TSH的标准是多少？
· 孕早期（1-12周）：建议控制在 < 2.5（部分指南要求 < 2.0）
· 孕中晚期：< 3.0
⚠️ 孕期标准比备孕期更严，发现超标要快速行动

📌 发现TSH升高，马上要做什么？
① 不要等下次产检，当天或次日联系内分泌科医生
② 已经在吃优甲乐的，等医生指示调整剂量
③ 没有吃优甲乐的，带着结果去评估是否需要开始
④ 每4-6周复查一次甲功，整个孕期都要坚持

📌 一句话：孕期TSH管理不能靠产检频率，要主动监测。

收藏这篇，把复查提醒设进手机日历里👇', '🤰刚确认怀孕TSH就升高了？桥本妈妈先看这篇再慌', '#桥本甲状腺炎 #孕早期 #TSH升高 #桥本妈妈 #孕期甲状腺 #桥本孕期 #甲状腺 #孕期健康 #优甲乐 #桥本甲状腺 #女性健康 #孕期检查 #桥本备孕 #甲减孕期 #怀孕注意事项', '景别：半身，可以手边放一张B超单或化验单作为视觉引入。道具/场景：家中温馨环境，光线柔和。情绪节奏：开场先给「别慌」的定心丸，中间专业讲解，结尾有陪伴感和行动指引，语气温柔但带有紧迫性提示。', CURRENT_TIMESTAMP)
ON CONFLICT(schedule_day_id) DO UPDATE SET weixin_script=excluded.weixin_script, weixin_title=excluded.weixin_title, weixin_cover=excluded.weixin_cover, xhs_script=excluded.xhs_script, xhs_title=excluded.xhs_title, xhs_tags=excluded.xhs_tags, shoot_tips=excluded.shoot_tips, updated_at=CURRENT_TIMESTAMP;
UPDATE schedule_days SET status='scripted' WHERE month='2026-06' AND day_number<=7 AND status='planned';