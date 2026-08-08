import { HotlineCategoryData } from '../types';

export const emergencyHotlines: Record<string, HotlineCategoryData[]> = {
  TH: [
    {
      id: "res",
      category: "🚨 เหตุด่วน / กู้ภัย / ไฟไหม้ / อุบัติเหตุรุนแรง",
      icon: "shield-alert",
      numbers: [
        {
          name: "เหตุด่วนเหตุร้าย (ตำรวจ)",
          nameEn: "Police Emergency",
          tel: "191",
          desc: "รับแจ้งเหตุฉุกเฉิน อาชญากรรม คดีประทุษร้าย ชิงทรัพย์ 24 ชั่วโมง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "สำนักงานตำรวจแห่งชาติ",
          lastVerified: "2025-01-15"
        },
        {
          name: "เจ็บป่วยฉุกเฉิน / เรียกรถพยาบาลกู้ชีพ",
          nameEn: "Emergency Medical Services (EMS)",
          tel: "1669",
          desc: "ศูนย์กู้ชีพนเรนทร สพฉ. บริการรถพยาบาลฉุกเฉินส่งต่อฟรีทั่วประเทศ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)",
          lastVerified: "2025-01-15"
        },
        {
          name: "แจ้งไฟไหม้ / สัตว์มีพิษเข้าบ้าน / กู้ภัยดับเพลิง",
          nameEn: "Fire & Rescue Disaster",
          tel: "199",
          desc: "สำนักป้องกันและบรรเทาสาธารณภัย กู้ภัยสัตว์เลื้อยคลาน จับงู ดับเพลิง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "สำนักป้องกันและบรรเทาสาธารณภัย",
          lastVerified: "2025-01-15"
        },
        {
          name: "ศูนย์เตือนภัยพิบัติแห่งชาติ / น้ำท่วม / ดินถล่ม (ปภ.)",
          nameEn: "Disaster Prevention & Mitigation (DDPM)",
          tel: "1784",
          desc: "กรมป้องกันและบรรเทาสาธารณภัย รายงานและขอความช่วยเหลือน้ำท่วม พายุ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กรมป้องกันและบรรเทาสาธารณภัย กระทรวงมหาดไทย",
          lastVerified: "2025-01-15"
        },
        {
          name: "แจ้งไฟป่า / หมอกควัน / ช่วยเหลือสัตว์ป่า",
          nameEn: "Wildfire & Wildlife Emergency",
          tel: "1362",
          desc: "กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช แจ้งเหตุไฟป่าและสัตว์ป่าพลัดหลง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช",
          lastVerified: "2025-01-15"
        },
        {
          name: "อุบัติเหตุทางน้ำ / กู้ภัยทางเรือ (กรมเจ้าท่า)",
          nameEn: "Marine Rescue Center",
          tel: "1196",
          desc: "ศูนย์ปลอดภัยทางน้ำ ช่วยเหลือเรืออับปาง คนตกน้ำ เหตุฉุกเฉินทางทะเล/แม่น้ำ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กรมเจ้าท่า กระทรวงคมนาคม",
          lastVerified: "2025-01-15"
        },
        {
          name: "ศูนย์วิทยุพระนคร (กู้ชีพกู้ภัยร่วมกตัญญู / ป่อเต็กตึ๊ง)",
          nameEn: "Rescue Foundation Hotline",
          tel: "1418",
          desc: "มูลนิธิป่อเต็กตึ๊ง และศูนย์วิทยุกู้ชีพเอกชน",
          hours: "24 ชั่วโมง",
          tollFree: false,
          source: "มูลนิธิป่อเต็กตึ๊ง",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "cyber",
      category: "💳 มิจฉาชีพ / อายัดบัญชีด่วน / หลอกลวงออนไลน์ (AOC)",
      icon: "credit-card",
      numbers: [
        {
          name: "ศูนย์ AOC 1441 (สายด่วนอายัดบัญชีคนร้ายทันที)",
          nameEn: "Anti Online Scam Operation Center",
          tel: "1441",
          desc: "ศูนย์ปฏิบัติการแก้ไขปัญหาอาชญากรรมออนไลน์ ระงับธุรกรรมบัญชีม้าในทันที",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (ดีอี)",
          lastVerified: "2025-01-15"
        },
        {
          name: "ตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี (บช.สอท.)",
          nameEn: "Cyber Crime Investigation Bureau (CCIB)",
          tel: "1441",
          desc: "แจ้งความคดีออนไลน์ ถูกแฮกข้อมูล หลอกลงทุน หลอกซื้อสินค้า",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กองบัญชาการตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วน ปปง. (ยึดทรัพย์และธุรกรรมต้องสงสัย)",
          nameEn: "Anti-Money Laundering Office (AMLO)",
          tel: "1710",
          desc: "สำนักงานป้องกันและปราบปรามการฟอกเงิน แจ้งเบาะแสบัญชีม้า แก๊งคอลเซ็นเตอร์",
          hours: "วันทำการ 08.30 - 16.30 น.",
          tollFree: false,
          source: "สำนักงาน ปปง.",
          lastVerified: "2025-01-15"
        },
        {
          name: "ส่งหลักฐานเบาะแสและสลิปคนร้ายทางอีเมล",
          nameEn: "Cyber Evidence Email Submission",
          email: "high-tech-crime@police.go.th",
          desc: "ส่งไฟล์หลักฐาน สกรีนช็อตแชต เลขบัญชีม้า และสลิปการโอนเงิน",
          hours: "ส่งได้ตลอด 24 ชั่วโมง",
          tollFree: true,
          source: "สำนักงานตำรวจแห่งชาติ",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "missing",
      category: "🔍 คนหาย / ลืมของมีค่า / สัตว์เลี้ยงพลัดหลง",
      icon: "search",
      numbers: [
        {
          name: "ศูนย์ข้อมูลคนหาย มูลนิธิกระจกเงา",
          nameEn: "Mirror Foundation Missing Persons",
          tel: "0807752673",
          desc: "ศูนย์ติดตามและประกาศตามหาคนหาย เด็กหาย ผู้ป่วยอัลไซเมอร์พลัดหลง",
          hours: "08.00 - 18.00 น. (เหตุฉุกเฉิน 24 ชม.)",
          tollFree: false,
          source: "มูลนิธิกระจกเงา",
          lastVerified: "2025-01-15"
        },
        {
          name: "แจ้งข้อมูลและส่งรูปคนหาย (อีเมลมูลนิธิกระจกเงา)",
          nameEn: "Missing Person Email Report",
          email: "info@backtohome.org",
          desc: "ส่งภาพถ่ายคนหาย ลำดับเหตุการณ์ และตำหนิรูปพรรณ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "มูลนิธิกระจกเงา",
          lastVerified: "2025-01-15"
        },
        {
          name: "จส.100 (แจ้งของหาย / สัตว์เลี้ยงหาย / รถเสีย)",
          nameEn: "JS100 Radio Emergency & Lost Property",
          tel: "1137",
          desc: "ศูนย์ประสานงานจราจร อุบัติเหตุ สัตว์เลี้ยงพลัดหลง และลืมของในรถแท็กซี่",
          hours: "24 ชั่วโมง",
          tollFree: false,
          source: "สถานีวิทยุ จส.100",
          lastVerified: "2025-01-15"
        },
        {
          name: "สวพ.FM91 (ศูนย์รับแจ้งของหาย / ลืมของบนแท็กซี่)",
          nameEn: "Traffic Police Radio FM91",
          tel: "1644",
          desc: "กองตำรวจสื่อสาร แจ้งเก็บของได้ ลืมของมีค่า ลืมกระเป๋าเงินในรถสาธารณะ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กองตำรวจสื่อสาร สำนักงานตำรวจแห่งชาติ",
          lastVerified: "2025-01-15"
        },
        {
          name: "ร่วมด้วยช่วยกัน (ศูนย์ประสานงานช่วยเหลือประชาชน)",
          nameEn: "Ruamduay Chuoikan Community Assistance",
          tel: "1677",
          desc: "ช่วยเหลือน้ำใจ รถสตาร์ทไม่ติด แบตเตอรี่หมด จับสัตว์มีพิษ ซ่อมเบื้องต้น",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "มูลนิธิร่วมด้วยช่วยกันสำนึกรักบ้านเกิด",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "law",
      category: "⚖️ ปรึกษาทนายฟรี / ร้องทุกข์ / ถูกเอาเปรียบ / ผู้บริโภค",
      icon: "scale",
      numbers: [
        {
          name: "สายด่วนสภาทนายความในพระบรมราชูปถัมภ์",
          nameEn: "Lawyers Council of Thailand",
          tel: "1167",
          desc: "บริการให้คำปรึกษาทางกฎหมายฟรี และขอทนายความอาสาว่าความช่วยเหลือ",
          hours: "08.30 - 16.30 น. (วันทำการ)",
          tollFree: false,
          source: "สภาทนายความในพระบรมราชูปถัมภ์",
          lastVerified: "2025-01-15"
        },
        {
          name: "อีเมลสภาทนายความ (ส่งเอกสารคดี)",
          nameEn: "Lawyers Council Email",
          email: "advocate@lawyerscouncil.or.th",
          desc: "ส่งสำเนาเอกสารสัญญา ข้อพิพาท หรือขอความช่วยเหลือทางอรรถคดี",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "สภาทนายความในพระบรมราชูปถัมภ์",
          lastVerified: "2025-01-15"
        },
        {
          name: "ศูนย์ดำรงธรรม กระทรวงมหาดไทย (ร้องทุกข์ปัญหาชาวบ้าน)",
          nameEn: "Damrongdhama Center Hotline",
          tel: "1567",
          desc: "รับเรื่องร้องเรียนร้องทุกข์ ปัญหาหนี้นอกระบบ ถูกเจ้าหน้าที่รัฐกลั่นแกล้ง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กระทรวงมหาดไทย",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วน สคบ. (คุ้มครองผู้บริโภค)",
          nameEn: "Office of the Consumer Protection Board",
          tel: "1166",
          desc: "ร้องเรียนซื้อสินค้าชำรุด ถูกหลอกสัญญา ไม่ได้รับความเป็นธรรมจากผู้ค้า",
          hours: "09.00 - 16.30 น.",
          tollFree: true,
          source: "สำนักงานคณะกรรมการคุ้มครองผู้บริโภค",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วนกระทรวงยุติธรรม (กองทุนยุติธรรม)",
          nameEn: "Ministry of Justice Assistance",
          tel: "1111",
          desc: "กด 77 ขอความช่วยเหลือเงินประกันตัว ช่วยเหลือทางคดี และเยียวยาเหยื่ออาชญากรรม",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กระทรวงยุติธรรม",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "social",
      category: "🧠 สุขภาพจิต / ความรุนแรงในครอบครัว / เด็กและสตรี",
      icon: "heart-pulse",
      numbers: [
        {
          name: "สายด่วนสุขภาพจิต กรมสุขภาพจิต",
          nameEn: "Department of Mental Health Hotline",
          tel: "1323",
          desc: "ให้คำปรึกษาภาวะซึมเศร้า เครียดสะสม วิตกกังวล ปรึกษาได้ฟรีโดยนักจิตวิทยา",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กรมสุขภาพจิต กระทรวงสาธารณสุข",
          lastVerified: "2025-01-15"
        },
        {
          name: "ศูนย์ช่วยเหลือสังคม กระทรวง พม. (OSCC)",
          nameEn: "Social Assistance Center (MSDHS)",
          tel: "1300",
          desc: "แจ้งเหตุความรุนแรงในครอบครัว ถูกทารุณกรรม ค้ามนุษย์ คนไร้ที่พึ่ง แม่เลี้ยงเดี่ยว",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วนบำบัดและฟื้นฟูยาเสพติด",
          nameEn: "Substance Abuse Treatment Hotline",
          tel: "1165",
          desc: "สถาบันบำบัดรักษาและฟื้นฟูผู้ติดยาเสพติดแห่งชาติบรมราชชนนี (สบยช.)",
          hours: "08.30 - 16.30 น.",
          tollFree: true,
          source: "กรมการแพทย์ กระทรวงสาธารณสุข",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วนเลิกบุหรี่แห่งชาติ (Quitline)",
          nameEn: "Thailand National Quitline",
          tel: "1600",
          desc: "ปรึกษาผู้เชี่ยวชาญวางแผนการเลิกสูบบุหรี่และบุหรี่ไฟฟ้าฟรี",
          hours: "09.00 - 20.00 น.",
          tollFree: true,
          source: "สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "travel",
      category: "🚗 ทางหลวง / จราจร / ช่วยเหลือนักท่องเที่ยว",
      icon: "car",
      numbers: [
        {
          name: "ตำรวจทางหลวง (อุบัติเหตุบนทางหลวงทั่วประเทศ)",
          nameEn: "Highway Patrol Police",
          tel: "1193",
          desc: "รถเสียบนทางหลวง ประสานงานกู้ภัย ขอความช่วยเหลือขณะเดินทางไกล",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กองบังคับการตำรวจทางหลวง",
          lastVerified: "2025-01-15"
        },
        {
          name: "ตำรวจท่องเที่ยว (Tourist Police 24/7)",
          nameEn: "Tourist Police Call Center",
          tel: "1155",
          desc: "ช่วยเหลือนักท่องเที่ยวชาวไทยและต่างชาติ มีล่ามภาษาอังกฤษ จีน ญี่ปุ่น รัสเซีย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กองบัญชาการตำรวจท่องเที่ยว",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วนกรมทางหลวง (ข้อมูลเส้นทาง / น้ำท่วมถนน)",
          nameEn: "Department of Highways",
          tel: "1586",
          desc: "สอบถามเส้นทางสภาพถนน ปิดสะพาน น้ำท่วมขัง และมอเตอร์เวย์ (กด 7)",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "กรมทางหลวง",
          lastVerified: "2025-01-15"
        },
        {
          name: "การทางพิเศษแห่งประเทศไทย (EXAT กู้ภัยบนทางด่วน)",
          nameEn: "Expressway Authority of Thailand",
          tel: "1543",
          desc: "แจ้งอุบัติเหตุ ยางแตก รถเสีย น้ำมันหมด บนทางพิเศษทุกสาย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การทางพิเศษแห่งประเทศไทย",
          lastVerified: "2025-01-15"
        },
        {
          name: "สายด่วนการรถไฟแห่งประเทศไทย (รฟท.)",
          nameEn: "State Railway of Thailand Hotline",
          tel: "1690",
          desc: "สอบถามเวลาเดินรถ และแจ้งเหตุฉุกเฉินทางรถไฟ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การรถไฟแห่งประเทศไทย",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "utility",
      category: "⚡ สาธารณูปโภค / ไฟฟ้าดับ / ประปาแตก / ก๊าซรั่ว",
      icon: "zap",
      numbers: [
        {
          name: "การไฟฟ้านครหลวง (MEA - กทม./นนทบุรี/สมุทรปราการ)",
          nameEn: "Metropolitan Electricity Authority",
          tel: "1130",
          desc: "แจ้งไฟฟ้าขัดข้อง ไฟดับ เสาไฟล้ม หม้อแปลงระเบิด กิ่งไม้พาดสายไฟ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การไฟฟ้านครหลวง",
          lastVerified: "2025-01-15"
        },
        {
          name: "การไฟฟ้าส่วนภูมิภาค (PEA - ต่างจังหวัด 74 จังหวัด)",
          nameEn: "Provincial Electricity Authority",
          tel: "1129",
          desc: "แจ้งไฟฟ้าดับ ฉุกเฉินกระแสไฟฟ้าขัดข้องในต่างจังหวัด",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การไฟฟ้าส่วนภูมิภาค",
          lastVerified: "2025-01-15"
        },
        {
          name: "การประปานครหลวง (MWA - กทม./นนทบุรี/สมุทรปราการ)",
          nameEn: "Metropolitan Waterworks Authority",
          tel: "1125",
          desc: "แจ้งท่อประปาแตก น้ำไม่ไหล น้ำประปาไหลอ่อน คุณภาพน้ำ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การประปานครหลวง",
          lastVerified: "2025-01-15"
        },
        {
          name: "การประปาส่วนภูมิภาค (PWA - ต่างจังหวัด)",
          nameEn: "Provincial Waterworks Authority",
          tel: "1662",
          desc: "แจ้งท่อเมนแตก ประปาขัดข้องในต่างจังหวัดทั่วประเทศ",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "การประปาส่วนภูมิภาค",
          lastVerified: "2025-01-15"
        },
        {
          name: "ปตท. แจ้งเหตุก๊าซรั่วไหลและท่อส่งก๊าซฉุกเฉิน",
          nameEn: "PTT Gas Leak Emergency Hotline",
          tel: "1365",
          desc: "แจ้งเหตุก๊าซหุงต้มหรือท่อส่งก๊าซธรรมชาติรั่วไหล",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "บริษัท ปตท. จำกัด (มหาชน)",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  US: [
    {
      id: "gen",
      category: "🚨 Universal Emergency & Disaster (USA)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Universal Emergency Hotline",
          tel: "911",
          desc: "Police, Fire, Ambulance and Medical Dispatch 24/7 across all states",
          hours: "24/7",
          tollFree: true,
          source: "Federal Communications Commission (FCC)",
          lastVerified: "2025-01-15"
        },
        {
          name: "Disaster Assistance (FEMA)",
          tel: "18006213362",
          desc: "Federal emergency management for hurricanes, tornadoes, and floods",
          hours: "24/7",
          tollFree: true,
          source: "Federal Emergency Management Agency (FEMA)",
          lastVerified: "2025-01-15"
        },
        {
          name: "National Poison Help Line",
          tel: "18002221222",
          desc: "Expert guidance for accidental poisoning, toxic exposure, chemical contact",
          hours: "24/7",
          tollFree: true,
          source: "American Association of Poison Control Centers",
          lastVerified: "2025-01-15"
        },
        {
          name: "Suicide & Crisis Lifeline",
          tel: "988",
          desc: "Free and confidential mental health support, suicide prevention 24/7",
          hours: "24/7",
          tollFree: true,
          source: "Substance Abuse and Mental Health Services Administration",
          lastVerified: "2025-01-15"
        }
      ]
    },
    {
      id: "missing",
      category: "🔍 Missing Children & Identity Theft",
      icon: "search",
      numbers: [
        {
          name: "Missing & Exploited Children (NCMEC)",
          tel: "18008435678",
          desc: "National Center for Missing & Exploited Children amber alert hotline",
          hours: "24/7",
          tollFree: true,
          source: "NCMEC",
          lastVerified: "2025-01-15"
        },
        {
          name: "FTC Identity Theft & Fraud Hotline",
          tel: "18774384338",
          desc: "Federal Trade Commission report cyber fraud, scam calls, identity theft",
          hours: "Mon-Fri 9am-5pm ET",
          tollFree: true,
          source: "Federal Trade Commission",
          lastVerified: "2025-01-15"
        },
        {
          name: "Spam & Cyber Scam Evidence (Email)",
          email: "spam@uce.gov",
          desc: "Forward phishing emails, fraudulent SMS transcripts to FTC investigators",
          hours: "24/7",
          tollFree: true,
          source: "FTC",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  JP: [
    {
      id: "gen",
      category: "🚨 緊急連絡先 (Japan Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (警察)",
          tel: "110",
          desc: "เหตุด่วน อาชญากรรม คดีทำร้ายร่างกาย อุบัติเหตุทางถนน",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "National Police Agency Japan",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance & Fire (救急・消防)",
          tel: "119",
          desc: "เจ็บป่วยฉุกเฉิน หมดสติ เรียกรถพยาบาล และดับเพลิง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Fire and Disaster Management Agency",
          lastVerified: "2025-01-15"
        },
        {
          name: "Japan Coast Guard (海上保安庁)",
          tel: "118",
          desc: "อุบัติเหตุทางทะเล เรือล่ม คนตกน้ำ หรือขอความช่วยเหลือตามแนวชายฝั่ง",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Japan Coast Guard",
          lastVerified: "2025-01-15"
        },
        {
          name: "TELL Lifeline Support (English Mental Health)",
          tel: "0357740992",
          desc: "บริการปรึกษาสุขภาพจิตภาษาอังกฤษสำหรับชาวต่างชาติในญี่ปุ่น",
          hours: "09.00 - 23.00 น.",
          tollFree: false,
          source: "TELL Japan",
          lastVerified: "2025-01-15"
        },
        {
          name: "Japan Visitor Hotline (JNTO Tourist Support)",
          tel: "05038162720",
          desc: "ศูนย์ช่วยเหลือนักท่องเที่ยว 24 ชม. มีล่ามภาษาอังกฤษ จีน เกาหลี",
          hours: "24 ชั่วโมง",
          tollFree: false,
          source: "Japan National Tourism Organization",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  KR: [
    {
      id: "gen",
      category: "🚨 긴급 전화번호 (Korea Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (경찰)",
          tel: "112",
          desc: "ตำรวจ รับแจ้งเหตุอาชญากรรมและเหตุฉุกเฉิน",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Korean National Police Agency",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance & Fire (소방서 / 구급차)",
          tel: "119",
          desc: "รถพยาบาลฉุกเฉินและดับเพลิงกู้ภัย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "National Fire Agency Korea",
          lastVerified: "2025-01-15"
        },
        {
          name: "Korea Travel Helpline (외국인 관광 안내)",
          tel: "1330",
          desc: "สายด่วนช่วยเหลือนักท่องเที่ยว มีล่ามภาษาอังกฤษ จีน ญี่ปุ่น",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Korea Tourism Organization",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  SG: [
    {
      id: "gen",
      category: "🚨 Singapore Emergency Services",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency",
          tel: "999",
          desc: "Crime & Urgent Police Response 24/7",
          hours: "24/7",
          tollFree: true,
          source: "Singapore Police Force",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance & Fire (SCDF)",
          tel: "995",
          desc: "Emergency Ambulance & Fire Fighting Civil Defence",
          hours: "24/7",
          tollFree: true,
          source: "Singapore Civil Defence Force",
          lastVerified: "2025-01-15"
        },
        {
          name: "National Anti-Scam Helpline",
          tel: "18007226688",
          desc: "Scam reporting, fraud transaction blocking advisory",
          hours: "24/7",
          tollFree: true,
          source: "National Crime Prevention Council Singapore",
          lastVerified: "2025-01-15"
        },
        {
          name: "Non-Emergency Ambulance",
          tel: "1777",
          desc: "Non-urgent medical transport and transfer",
          hours: "24/7",
          tollFree: false,
          source: "SCDF",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  MY: [
    {
      id: "gen",
      category: "🚨 MERS 999 Emergency (Malaysia)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Universal Emergency 999",
          tel: "999",
          desc: "Police, Hospital Ambulance, Civil Defence (APM)",
          hours: "24/7",
          tollFree: true,
          source: "MCMC MERS 999",
          lastVerified: "2025-01-15"
        },
        {
          name: "Bomba Fire & Rescue (Jabatan Bomba)",
          tel: "994",
          desc: "Firefighters, hazardous material and flood rescue",
          hours: "24/7",
          tollFree: true,
          source: "Jabatan Bomba dan Penyelamat Malaysia",
          lastVerified: "2025-01-15"
        },
        {
          name: "National Scam Response Centre (NSRC)",
          tel: "997",
          desc: "Rapid financial fraud and online scam freeze hotline",
          hours: "8am - 8pm Daily",
          tollFree: true,
          source: "Bank Negara Malaysia",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  VN: [
    {
      id: "gen",
      category: "🚨 Dịch vụ khẩn cấp (Vietnam Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (Công an)",
          tel: "113",
          desc: "ตำรวจ รับแจ้งเหตุด่วนเหตุร้ายและอาชญากรรม",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Ministry of Public Security Vietnam",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance EMS (Cấp cứu)",
          tel: "115",
          desc: "รถพยาบาลฉุกเฉินและหน่วยกู้ชีพทางการแพทย์",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Ministry of Health Vietnam",
          lastVerified: "2025-01-15"
        },
        {
          name: "Firefighters & Rescue (Cứu hỏa)",
          tel: "114",
          desc: "ดับเพลิงและกู้ภัยสาธารณภัย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Fire Prevention and Rescue Police",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  LA: [
    {
      id: "gen",
      category: "🚨 ສາຍດ່ວນສຸກເສີນ (Laos Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (ຕຳຫຼວດ)",
          tel: "191",
          desc: "ตำรวจ รับแจ้งเหตุด่วนในลาว",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Ministry of Public Security Laos",
          lastVerified: "2025-01-15"
        },
        {
          name: "Vientiane Rescue 1623 / Ambulance",
          tel: "1623",
          desc: "หน่วยกู้ชีพกู้ภัยเวียงจันทน์ 1623 บริการช่วยชีวิตฟรี 24 ชม.",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Vientiane Rescue 1623",
          lastVerified: "2025-01-15"
        },
        {
          name: "Fire Emergency (ດັບເພີງ)",
          tel: "190",
          desc: "หน่วยดับเพลิงและบรรเทาสาธารณภัย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Fire Department Laos",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  KH: [
    {
      id: "gen",
      category: "🚨 លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់ (Cambodia Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (នគរបាល)",
          tel: "117",
          desc: "ตำรวจฉุกเฉินกัมพูชา",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "General Commissariat of National Police",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance EMS (សង្គ្រោះបន្ទាន់)",
          tel: "119",
          desc: "รถพยาบาลฉุกเฉินและหน่วยแพทย์",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Ministry of Health Cambodia",
          lastVerified: "2025-01-15"
        },
        {
          name: "Fire Emergency (ពន្លត់អគ្គីភ័យ)",
          tel: "118",
          desc: "ดับเพลิงและกู้ภัย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Fire Department Cambodia",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  MM: [
    {
      id: "gen",
      category: "🚨 အရေးပေါ်ဖုန်းနံပါတ်များ (Myanmar Emergency)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Police Emergency (ရဲတပ်ဖွဲ့)",
          tel: "199",
          desc: "ตำรวจฉุกเฉินเมียนมา",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Myanmar Police Force",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance EMS (လူနာတင်ယာဉ်)",
          tel: "192",
          desc: "รถพยาบาลฉุกเฉิน",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Ministry of Health Myanmar",
          lastVerified: "2025-01-15"
        },
        {
          name: "Fire Department (မီးသတ်)",
          tel: "191",
          desc: "หน่วยดับเพลิงและกู้ภัย",
          hours: "24 ชั่วโมง",
          tollFree: true,
          source: "Myanmar Fire Services Department",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  ID: [
    {
      id: "gen",
      category: "🚨 Layanan Darurat 112 (Indonesia)",
      icon: "shield-alert",
      numbers: [
        {
          name: "Universal Emergency Line",
          tel: "112",
          desc: "Pusat Panggilan Darurat Terpadu 112 (Polisi, Medis, Damkar)",
          hours: "24 Jam",
          tollFree: true,
          source: "Kementerian Komunikasi dan Informatika",
          lastVerified: "2025-01-15"
        },
        {
          name: "Police (Polisi)",
          tel: "110",
          desc: "Kepolisian Negara Republik Indonesia",
          hours: "24 Jam",
          tollFree: true,
          source: "Polri",
          lastVerified: "2025-01-15"
        },
        {
          name: "Ambulance & Medical (Ambulans)",
          tel: "118",
          desc: "Layanan Ambulans Gawat Darurat",
          hours: "24 Jam",
          tollFree: true,
          source: "Kemenkes RI",
          lastVerified: "2025-01-15"
        },
        {
          name: "Fire Fighters (Pemadam Kebakaran)",
          tel: "113",
          desc: "Dinas Pemadam Kebakaran dan Penyelamatan",
          hours: "24 Jam",
          tollFree: true,
          source: "Damkar",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  UK: [
    {
      id: "gen",
      category: "🚨 UK Emergency & Coastguard Services",
      icon: "shield-alert",
      numbers: [
        {
          name: "Universal Emergency Line",
          tel: "999",
          desc: "Police, Fire, Ambulance and HM Coastguard 24/7 across the UK",
          hours: "24/7",
          tollFree: true,
          source: "UK Home Office & Emergency Services",
          lastVerified: "2025-01-15"
        },
        {
          name: "NHS Medical Non-Emergency",
          tel: "111",
          desc: "Urgent medical advice when condition is not immediately life-threatening",
          hours: "24/7",
          tollFree: true,
          source: "National Health Service (NHS 111)",
          lastVerified: "2025-01-15"
        },
        {
          name: "Police Non-Emergency",
          tel: "101",
          desc: "Reporting minor crimes, car theft, property damage after the event",
          hours: "24/7",
          tollFree: false,
          source: "UK Police",
          lastVerified: "2025-01-15"
        },
        {
          name: "Samaritans Mental Health Support",
          tel: "116123",
          desc: "Confidential emotional support and crisis listening 24 hours a day",
          hours: "24/7",
          tollFree: true,
          source: "Samaritans UK",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ],
  EU: [
    {
      id: "gen",
      category: "🚨 European Emergency 112",
      icon: "shield-alert",
      numbers: [
        {
          name: "Single European Emergency Number",
          tel: "112",
          desc: "Valid in all 27 EU member states for Police, Medical & Fire",
          hours: "24/7",
          tollFree: true,
          source: "European Emergency Number Association (EENA)",
          lastVerified: "2025-01-15"
        },
        {
          name: "Missing Children Europe Hotline",
          tel: "116000",
          desc: "Pan-European hotline for reporting missing or sexually exploited children",
          hours: "24/7",
          tollFree: true,
          source: "Missing Children Europe",
          lastVerified: "2025-01-15"
        },
        {
          name: "Emotional Support & Crisis Line (Europe)",
          tel: "116123",
          desc: "Emotional support helpline for callers experiencing distress",
          hours: "24/7",
          tollFree: true,
          source: "Mental Health Europe",
          lastVerified: "2025-01-15"
        }
      ]
    }
  ]
};
