import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SCENIC_SPOTS = [
  {
    slug: "jiuzhaigou",
    name: "九寨沟",
    nameEn: "Jiuzhaigou Valley",
    province: "四川",
    city: "阿坝",
    description: "九寨沟位于四川省阿坝藏族羌族自治州，是世界自然遗产、国家5A级旅游景区。以翠海、叠瀑、彩林、雪峰、藏情、蓝冰\"六绝\"著称，被誉为\"人间仙境，童话世界\"。",
    ticketPrice: 169,
    openingHours: "旺季 07:00-19:00 / 淡季 08:30-18:00",
    bestSeasons: JSON.stringify(["9月", "10月", "11月"]),
    tips: "建议游玩2天，提前在线购票。景区内需乘坐观光车。海拔较高注意防晒和防寒。秋季是最佳观赏季节，五花海和诺日朗瀑布是必看景点。",
    rating: 4.8,
    reviewCount: 12580,
    latitude: 33.2631,
    longitude: 103.9186,
    images: [
      { url: "/scenic/jiuzhaigou-1.jpg", alt: "九寨沟五花海" },
      { url: "/scenic/jiuzhaigou-2.jpg", alt: "九寨沟诺日朗瀑布" },
      { url: "/scenic/jiuzhaigou-3.jpg", alt: "九寨沟秋色" },
    ],
    facilities: [
      { type: "entrance", name: "景区正门", latitude: 33.2631, longitude: 103.9186 },
      { type: "parking", name: "游客中心停车场", latitude: 33.2608, longitude: 103.9170 },
      { type: "restaurant", name: "诺日朗餐厅", latitude: 33.2710, longitude: 103.9020 },
      { type: "restroom", name: "游客中心卫生间", latitude: 33.2625, longitude: 103.9180 },
    ],
  },
  {
    slug: "zhangjiajie",
    name: "张家界",
    nameEn: "Zhangjiajie",
    province: "湖南",
    city: "张家界",
    description: "张家界国家森林公园是中国第一个国家森林公园，以独特的石英砂岩峰林地貌闻名于世。电影《阿凡达》中的悬浮山原型即取景于此。",
    ticketPrice: 228,
    openingHours: "07:00-18:00",
    bestSeasons: JSON.stringify(["4月", "5月", "9月", "10月"]),
    tips: "建议游玩3天。天门山和武陵源核心景区分开购票。山上温差大，备好外套。雨天云雾缭绕别有风味。",
    rating: 4.7,
    reviewCount: 18920,
    latitude: 29.3294,
    longitude: 110.4840,
    images: [
      { url: "/scenic/zhangjiajie-1.jpg", alt: "张家界峰林" },
      { url: "/scenic/zhangjiajie-2.jpg", alt: "天门山" },
      { url: "/scenic/zhangjiajie-3.jpg", alt: "袁家界" },
    ],
    facilities: [
      { type: "entrance", name: "森林公园正门", latitude: 29.3294, longitude: 110.4840 },
      { type: "parking", name: "正门停车场", latitude: 29.3280, longitude: 110.4820 },
      { type: "restaurant", name: "山顶餐厅", latitude: 29.3450, longitude: 110.4600 },
      { type: "restroom", name: "游客中心卫生间", latitude: 29.3285, longitude: 110.4835 },
    ],
  },
  {
    slug: "guilin",
    name: "桂林",
    nameEn: "Guilin",
    province: "广西",
    city: "桂林",
    description: "桂林山水甲天下，以漓江山水和喀斯特地貌闻名。乘船游览漓江，欣赏象鼻山、阳朔十里画廊等经典景观。",
    ticketPrice: 80,
    openingHours: "全天开放（游船 08:00-17:00）",
    bestSeasons: JSON.stringify(["4月", "5月", "6月", "9月", "10月"]),
    tips: "建议游玩3-4天。漓江游船从桂林到阳朔约4小时。阳朔西街夜生活丰富。租自行车骑行十里画廊是必体验项目。",
    rating: 4.6,
    reviewCount: 22100,
    latitude: 25.2736,
    longitude: 110.2902,
    images: [
      { url: "/scenic/guilin-1.jpg", alt: "漓江山水" },
      { url: "/scenic/guilin-2.jpg", alt: "阳朔十里画廊" },
      { url: "/scenic/guilin-3.jpg", alt: "象鼻山" },
    ],
    facilities: [
      { type: "entrance", name: "漓江景区入口", latitude: 25.2736, longitude: 110.2902 },
      { type: "parking", name: "景区停车场", latitude: 25.2720, longitude: 110.2880 },
      { type: "restaurant", name: "阳朔西街美食街", latitude: 24.7785, longitude: 110.4966 },
    ],
  },
  {
    slug: "huangshan",
    name: "黄山",
    nameEn: "Yellow Mountain",
    province: "安徽",
    city: "黄山",
    description: "黄山以奇松、怪石、云海、温泉、冬雪\"五绝\"著称于世，是世界文化与自然双重遗产。徐霞客赞曰：'五岳归来不看山，黄山归来不看岳'。",
    ticketPrice: 190,
    openingHours: "06:30-17:00",
    bestSeasons: JSON.stringify(["3月", "4月", "5月", "10月", "11月"]),
    tips: "建议游玩2天，住山顶看日出。提前预订山顶酒店。登山杖和防滑鞋必备。云海多见于雨后初晴。",
    rating: 4.7,
    reviewCount: 16780,
    latitude: 30.1345,
    longitude: 118.1655,
    images: [
      { url: "/scenic/huangshan-1.jpg", alt: "黄山迎客松" },
      { url: "/scenic/huangshan-2.jpg", alt: "黄山云海" },
      { url: "/scenic/huangshan-3.jpg", alt: "黄山日出" },
    ],
    facilities: [
      { type: "entrance", name: "南大门", latitude: 30.1345, longitude: 118.1655 },
      { type: "parking", name: "南门停车场", latitude: 30.1330, longitude: 118.1640 },
      { type: "restaurant", name: "白云宾馆餐厅", latitude: 30.1456, longitude: 118.1708 },
      { type: "restroom", name: "玉屏楼卫生间", latitude: 30.1400, longitude: 118.1680 },
    ],
  },
  {
    slug: "xihu",
    name: "西湖",
    nameEn: "West Lake",
    province: "浙江",
    city: "杭州",
    description: "杭州西湖是中国十大名胜之一，以'淡妆浓抹总相宜'的湖光山色著称。西湖十景如苏堤春晓、断桥残雪、雷峰夕照等名扬天下。",
    ticketPrice: 0,
    openingHours: "全天开放",
    bestSeasons: JSON.stringify(["3月", "4月", "5月", "9月", "10月"]),
    tips: "免费开放，建议游玩1-2天。骑行环湖约2小时。推荐乘坐手划船游览。周边有灵隐寺、龙井村可一并游览。",
    rating: 4.5,
    reviewCount: 34500,
    latitude: 30.2427,
    longitude: 120.1463,
    images: [
      { url: "/scenic/xihu-1.jpg", alt: "西湖全景" },
      { url: "/scenic/xihu-2.jpg", alt: "雷峰塔" },
      { url: "/scenic/xihu-3.jpg", alt: "断桥残雪" },
    ],
    facilities: [
      { type: "entrance", name: "湖滨入口", latitude: 30.2427, longitude: 120.1463 },
      { type: "parking", name: "湖滨停车场", latitude: 30.2410, longitude: 120.1450 },
      { type: "restaurant", name: "楼外楼", latitude: 30.2520, longitude: 120.1420 },
      { type: "restroom", name: "苏堤公共卫生间", latitude: 30.2490, longitude: 120.1390 },
    ],
  },
  {
    slug: "dunhuang",
    name: "敦煌",
    nameEn: "Dunhuang",
    province: "甘肃",
    city: "酒泉",
    description: "敦煌是丝绸之路上的明珠，以莫高窟壁画和鸣沙山月牙泉闻名。莫高窟是世界现存规模最大、内容最丰富的佛教艺术圣地。",
    ticketPrice: 238,
    openingHours: "莫高窟 08:00-18:00 / 鸣沙山 06:00-19:30",
    bestSeasons: JSON.stringify(["5月", "6月", "9月", "10月"]),
    tips: "莫高窟需提前预约，每日限流6000人。鸣沙山建议傍晚去，看日落和月牙泉。注意防晒补水，沙漠温差大。",
    rating: 4.8,
    reviewCount: 9800,
    latitude: 40.0415,
    longitude: 94.8030,
    images: [
      { url: "/scenic/dunhuang-1.jpg", alt: "莫高窟" },
      { url: "/scenic/dunhuang-2.jpg", alt: "鸣沙山月牙泉" },
      { url: "/scenic/dunhuang-3.jpg", alt: "敦煌雅丹" },
    ],
    facilities: [
      { type: "entrance", name: "莫高窟数字中心", latitude: 40.0415, longitude: 94.8030 },
      { type: "parking", name: "莫高窟停车场", latitude: 40.0400, longitude: 94.8015 },
      { type: "restaurant", name: "敦煌夜市", latitude: 40.1370, longitude: 94.6620 },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding scenic spots...");

  for (const spot of SCENIC_SPOTS) {
    const { images, facilities, ...data } = spot;
    const created = await prisma.scenicSpot.upsert({
      where: { slug: spot.slug },
      create: data,
      update: data,
    });

    // Seed images
    await prisma.scenicImage.deleteMany({ where: { scenicId: created.id } });
    for (let i = 0; i < images.length; i++) {
      await prisma.scenicImage.create({
        data: { ...images[i]!, scenicId: created.id, sortOrder: i },
      });
    }

    // Seed facilities
    await prisma.scenicFacility.deleteMany({ where: { scenicId: created.id } });
    for (const fac of facilities) {
      await prisma.scenicFacility.create({
        data: { ...fac, scenicId: created.id },
      });
    }
  }

  console.log(`✅ Seeded ${SCENIC_SPOTS.length} scenic spots`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
