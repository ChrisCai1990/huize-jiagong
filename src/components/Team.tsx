"use client";

const members = [
  {
    name: "菅晓勇",
    title: "研究员 · 硕士生导师",
    photo: "/images/team/jian-xiaoyong.jpg",
    tags: ["中国注册营养师", "国家执业药师", "功能医学"],
    desc: "长期从事生物医药研究开发与技术管理，曾任上市制药集团技术总监兼北京药物研究院院长。主持国家《重大新药创制》等国家级科技重大项目10余项，申请国家发明专利15项。北大功能医学高级研修班首期学员，现专注功能医学精准健康管理。",
    orgs: ["世界中联医养结合专委会委员", "中国营养学会注册营养专家", "北京睡眠与健康促进会脑营养分会副会长"],
  },
  {
    name: "朱 萍",
    title: "成都言康医疗技术有限公司创始人",
    photo: "/images/team/zhu-ping.jpg",
    tags: ["营养师", "健康管理师", "心理咨询师"],
    desc: "25年深耕慢病逆转与健康管理，带领36人专业团队（含副主任医师4名、健康管理师20名）。累计服务个人客户10万+，现有健管会员1000+。京东健康消费医疗全国供应商，服务中国移动、五粮液集团、腾讯等知名企业。",
    orgs: ["四川省整合医学长寿与功能医学分会副秘书长", "北大功能医学高级研修班首期学员"],
  },
  {
    name: "孙 伟",
    title: "妇科主治医师",
    photo: "/images/team/sun-wei.jpg",
    tags: ["从业19年", "微创手术", "功能医学"],
    desc: "19年妇产科临床经验，曾就职于河北燕达医院、北京优联医院，并于华西医院、北京朝阳医院、北京友谊医院进修。擅长子宫内膜异位症、多囊卵巢综合征、盆底疾病及更年期综合征的规范诊治，精通腹腔镜等微创手术技术。",
    orgs: ["中国老年医学学会妇科分会委员", "北大功能医学高级研修班首期学员"],
  },
  {
    name: "范龙佳",
    title: "健康管理项目负责人",
    photo: "/images/team/fan-longjia.jpg",
    tags: ["再生医学", "免疫与微生态", "健康管理"],
    desc: "毕业于芬兰玉门大学工商管理专业，现任北京沃森克里克集团葆康计划健康管理项目负责人。深耕免疫功能与肠道微生态领域，致力于将前沿再生医学与健康管理实践相结合。",
    orgs: ["美国再生医学委员会青年委员", "北京生物工程学会免疫与微生态专委会秘书长", "北大功能医学高级研修班学员"],
  },
];

function Avatar({ name, photo }: { name: string; photo: string }) {
  return (
    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0" style={{ border: "2px solid var(--green-200)" }}>
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className="w-full h-full items-center justify-center text-xl font-bold text-white hidden"
        style={{ background: "linear-gradient(135deg, var(--green-700), var(--green-500))" }}
      >
        {name.replace(/\s/g, "")[0]}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-24 px-6" style={{ background: "var(--green-50)" }}>
      <div className="max-w-6xl mx-auto">

        {/* 顶部标题 */}
        <div className="text-center mb-14">
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--green-700)" }}>
            专业团队
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-light text-gray-900">
            北大功能医学
            <br />
            <span className="font-semibold" style={{ color: "var(--green-800)" }}>首期研修班核心成员</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            汇聚药学研究、临床医学、营养健康、健康管理多领域顶尖专家，以功能医学为核心，为您提供全方位精准健康管理。
          </p>
        </div>

        {/* 成员网格 */}
        <div className="grid md:grid-cols-2 gap-6">
          {members.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl p-7 border flex flex-col gap-4"
              style={{ borderColor: "var(--green-100)", boxShadow: "0 2px 16px rgba(46,125,107,0.06)" }}
            >
              {/* 头像 + 名字 + 职称 */}
              <div className="flex items-center gap-4">
                <Avatar name={m.name} photo={m.photo} />
                <div>
                  <div className="text-xl font-bold text-gray-900">{m.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--green-700)" }}>{m.title}</div>
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: "var(--green-50)", color: "var(--green-700)", border: "1px solid var(--green-200)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 简介 */}
              <p className="text-sm text-gray-600 leading-relaxed">{m.desc}</p>

              {/* 任职 */}
              <div className="pt-3 border-t flex flex-col gap-1.5" style={{ borderColor: "var(--green-100)" }}>
                {m.orgs.map((o) => (
                  <div key={o} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--green-400)" }} />
                    {o}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
