import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link2 } from "lucide-react";
import { asset } from "../utils/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

/*
  ИЗОБРАЖЕНИЯ: Категориите 01, 02, 03, 04, 09, 12, 13, 14 имат повече от един
  path в масива "images" (carousel със стрелки).

  ЕЗИК: съществуват ДВА пълни dataset-а (categoriesBg / categoriesEn) със
  СЪЩИЯ code/groupKey/images за всяка категория -- така филтрирането по група
  не се "чупи" при смяна на езика, и се показват СЪЩИТЕ реални снимки и в двата.
*/

const categoriesBg = [
  { code: "01", groupKey: "mesh", title: "Заварени мрежи", tagline: "Електрозаварени мрежи на руло в пълна гама размери, височини и диаметри на тел, производство NORMA S.A.", desc: "Електрозаварени (заварени) мрежи на руло — пълна гама размери, височини и диаметри на тел.",
    images: [asset("/images/product-04.png"), asset("/images/pontarista-1.png"), asset("/images/pontarista-2.jpg"), asset("/images/pontarista-3.png")],
    variants: [
      { name: "Мрежа 50×50 / ø2.50", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 50×50 / ø3.00", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 50×50 / ø3.50", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 50×50 / ø4.00", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 75×50 / ø2.50", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 75×50 / ø3.00", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Мрежа 25×25 / ø2.00", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,50 m"]] },
      { name: "Мрежа 25×25 / ø2.50", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,50 m"]] },
      { name: "Мрежа 19×19 / ø1.00", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,00 m"]] },
      { name: "Мрежа 19×19 / ø1.40", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,00 m"]] },
      { name: "Мрежа 12×12 / ø0.80", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,00 m"]] },
      { name: "Мрежа 12×25 / ø1.00", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,00 m"]] },
    ] },
  { code: "02", groupKey: "mesh", title: "Плетени мрежи (Chain-link)", tagline: "Плетени (chain-link) мрежи, поцинковани или с PVC покритие, серия ЕВРОС 1, за ограждения и спортни обекти.", desc: "Плетени (chain-link) мрежи на руло, поцинковани или с PVC покритие. Серия «ЕВРОС 1».",
    images: [asset("/images/product-01.jpg"), asset("/images/diktyota-1.jpg"), asset("/images/diktyota-2.png")],
    variants: [
      { name: "Плетена мрежа 50×50 / ø2.20 поцинк.", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Плетена мрежа 50×50 / ø2.50 поцинк.", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Плетена мрежа 50×50 / ø3.00 поцинк.", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,50 m"]] },
      { name: "Плетена мрежа 50×50 / ø2.50 PVC зелена", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Плетена мрежа 50×50 / ø3.00 PVC зелена", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,50 m"]] },
      { name: "Плетена мрежа 60×60 / ø2.50 поцинк.", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,00 m"]] },
      { name: "Плетена мрежа 60×60 / ø3.00 поцинк.", subtitle: "Руло 15 m", specs: [["Височина", "1,00–2,50 m"]] },
    ] },
  { code: "03", groupKey: "mesh", title: "Поцинкована мрежа на лист", tagline: "Заварени поцинковани мрежи на листове за строителни и индустриални приложения.", desc: "Заварени поцинковани мрежи на листове, 50 бр./пакет.",
    images: [asset("/images/panel-galvanized-1.png"), asset("/images/panel-galvanized-2.png"), asset("/images/panel-galvanized-3.jpg")],
    variants: [
      { name: "Лист 50×50 / ø3.00", subtitle: "50 бр./пакет", specs: [["Размер", "1×2 m"]] },
      { name: "Лист 50×50 / ø4.00", subtitle: "50 бр./пакет", specs: [["Размер", "1×2 m"]] },
      { name: "Лист 50×50 / ø5.00", subtitle: "50 бр./пакет", specs: [["Размер", "1×2 m"]] },
    ] },
  { code: "04", groupKey: "mesh", title: "NORMA Panel — Боядисани & Поцинковани", tagline: "Panel мрежи поцинковани или с PVC покритие на листове, налични в цветове RAL 6005, 7043, 7045.", desc: "Мрежи поцинковани и с PVC покритие (panel) на листове 2,50 m. Цветове: RAL 6005, 7043, 7045.",
    images: [asset("/images/product-02.jpg"), asset("/images/norma-panel-1.png"), asset("/images/norma-panel-2.png"), asset("/images/norma-panel-3.jpg"), asset("/images/norma-panel-5.jpg"), asset("/images/norma-panel-4.png")],
    variants: [
      { name: "Панел ø4 поцинкован", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
      { name: "Панел ø4 RAL 6005 (зелено)", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
      { name: "Панел ø4 RAL 7043 (тъмно сиво)", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
      { name: "Панел ø4 RAL 7045 (светло сиво)", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
      { name: "Панел ø5 поцинкован", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
      { name: "Панел ø5 RAL 6005 (зелено)", subtitle: "", specs: [["Размери", "2,50×1,03 m | 2,50×1,53 m | 2,50×2,03 m"]] },
    ] },
  { code: "05", groupKey: "mesh", title: "Шестоъгълна мрежа", tagline: "Класическа шестоъгълна мрежа за птицеферми, градини и леки ограждения.", desc: "Класическа шестоъгълна мрежа за птицеферми, градини и леки ограждения.",
    images: [asset("/images/hexagonal-1.png")],
    variants: [
      { name: "Шестоъгълна 25 mm / ø0.56", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,50 m"]] },
      { name: "Шестоъгълна 25 mm / ø0.70", subtitle: "Руло 25 m", specs: [["Височина", "0,50–1,50 m"]] },
      { name: "Шестоъгълна 13 mm / ø0.56", subtitle: "Руло 10 m", specs: [["Височина", "0,50–1,00 m"]] },
      { name: "Шестоъгълна 40 mm / ø0.70", subtitle: "Руло 25 m", specs: [["Височина", "0,50–2,00 m"]] },
      { name: "Шестоъгълна 50 mm / ø0.90", subtitle: "Руло 25 m", specs: [["Височина", "1,00–2,00 m"]] },
    ] },
  { code: "06", groupKey: "security", title: "Бодлива тел", tagline: "Бодлива поцинкована тел на руло за сигурност на парцели и обекти.", desc: "Бодлива поцинкована тел на руло 50 m или 100 m.",
    images: [asset("/images/product-03.png")],
    variants: [
      { name: "Бодлива тел ø1.70 поцинк.", subtitle: "Руло 50 m | Двуредова", specs: [] },
      { name: "Бодлива тел ø2.00 поцинк.", subtitle: "Руло 50 m | Двуредова", specs: [] },
      { name: "Бодлива тел ø2.00 поцинк.", subtitle: "Руло 100 m | Двуредова", specs: [] },
      { name: "Бодлива тел ø2.50 поцинк.", subtitle: "Руло 100 m | Двуредова", specs: [] },
    ] },
  { code: "07", groupKey: "security", title: "Концертина (тип НАТО)", tagline: "Концертина за сигурност тип НАТО, поцинкована, за висока периметрова защита.", desc: "Концертина за сигурност тип НАТО, поцинкована.",
    images: [asset("/images/concertina-1.png")],
    variants: [
      { name: "Концертина ø45 cm", subtitle: "Руло 8–10 m | Поцинкована", specs: [] },
      { name: "Концертина ø60 cm", subtitle: "Руло 8–10 m | Поцинкована", specs: [] },
      { name: "Концертина ø90 cm", subtitle: "Руло 8–10 m | Поцинкована", specs: [] },
      { name: "Концертина Flat ø60 cm", subtitle: "Руло 15 m | Поцинкована", specs: [] },
    ] },
  { code: "08", groupKey: "materials", title: "Телове", tagline: "Поцинковани и черни телове за балиране, лозя и всякаква индустриална употреба.", desc: "Поцинковани, черни, прави, за балиране — за всяка употреба.",
    images: [asset("/images/wire-1.png")],
    variants: [
      { name: "Тел поцинкован ø1.00–ø4.00", subtitle: "Руло 25–50 kg", specs: [] },
      { name: "Тел черен (меки) ø1.00–ø3.00", subtitle: "Руло 25–50 kg", specs: [] },
      { name: "Тел за балиране ø3.00–ø4.00", subtitle: "Руло 25–50 kg", specs: [] },
      { name: "Тел прав поцинк. ø2.50–ø4.00", subtitle: "", specs: [["Дължина", "4,00–6,00 m"]] },
      { name: "Тел прав пластифициран ø3.50", subtitle: "PVC", specs: [["Дължина", "4,00–6,00 m"]] },
      { name: "Тел за лозя ø2.20", subtitle: "Руло 25 kg | Поцинкован", specs: [] },
    ] },
  { code: "09", groupKey: "materials", title: "Стълбове & Тръби", tagline: "Кухи профили, поцинковани тръби и ъглови железа за укрепване на ограда.", desc: "Кухи профили, поцинковани тръби и ъглови железа за укрепване на ограда.",
    images: [asset("/images/posts-tubes-1.jpg"), asset("/images/posts-painted-2.jpg"), asset("/images/posts-painted-3.jpg"), asset("/images/posts-tubes-4.jpg"), asset("/images/posts-angles-5.jpg")],
    variants: [
      { name: "Кухи профил 50x50 Пластифициран – Дебелина 2,00 mm", subtitle: "С основа, пластифицирани (PVC)", specs: [["Размери", "50×50 mm"], ["Дебелина", "2,00 mm"], ["Налични височини", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Кухи профил 50x50 Пластифициран – Дебелина 1,50 mm", subtitle: "С основа, пластифицирани (PVC)", specs: [["Размери", "50×50 mm"], ["Дебелина", "1,50 mm"], ["Налични височини", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Кухи профил 50x50 Поцинкован – Дебелина 2,00 mm", subtitle: "С основа, поцинковани", specs: [["Размери", "50×50 mm"], ["Дебелина", "2,00 mm"], ["Налични височини", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Кухи профил 50x50 Поцинкован – Дебелина 1,50 mm", subtitle: "С основа, поцинковани", specs: [["Размери", "50×50 mm"], ["Дебелина", "1,50 mm"], ["Налични височини", "1,00 – 1,20 – 1,50 – 1,76 – 1,96 m"]] },
      { name: "Тръбни стълбове поцинковани", subtitle: "Горещо поцинковане, с основа", specs: [["Диаметър", "Ø42 – Ø48 – Ø60 mm"], ["Дебелина на стената", "1,50 – 2,00 mm"], ["Височина", "1,50 – 2,00 – 2,50 m"], ["Покритие", "Горещо поцинковане"]] },
      { name: "Ъглови железни стълбове", subtitle: "Ъглови стълбове, различни размери", specs: [["Размери", "30x30 – 40x30 – 40x40 – 50x50 mm"], ["Височина", "1,00 – 1,50 – 2,00 m"], ["Дебелина", "3,00 – 4,00 mm"]] },
      { name: "Тапи, Клипсове & Дюбели", subtitle: "Свързващи елементи за мрежи", specs: [["Тапи", "50x50 mm – 60x40 mm"], ["Свързващи клипсове", "за панелни мрежи"], ["PVC клипс съединители", "за свързване на мрежи"], ["Пластмасова тапа", "за стълб 50x50 mm"], ["Метални тирфони", "10x100 mm"], ["Дюбели", "M8 – M10 – M12"]] },
    ] },
  { code: "10", groupKey: "materials", title: "Пирони & Телчета", tagline: "Строителни и стоманени пирони, скоби, вилици и телчета за монтаж на мрежи.", desc: "Строителни пирони, стоманени пирони, скоби, вилици и телчета.",
    images: [asset("/images/nails-1.png")],
    variants: [
      { name: "Строителни пирони", subtitle: "25 kg кутия", specs: [["Размери", "2\"–6\""]] },
      { name: "Стоманени пирони", subtitle: "5 kg кутия", specs: [["Размери", "30–80 mm"]] },
      { name: "Криви пирони (скоби)", subtitle: "5 kg кутия", specs: [["Размери", "25–50 mm"]] },
      { name: "Вилици (обтегачи)", subtitle: "Различни размери", specs: [] },
      { name: "Телчета за мрежа", subtitle: "ø2.00 | 5 kg кутия", specs: [] },
    ] },
  { code: "11", groupKey: "constructions", title: "Габиони", tagline: "Телени кошове (gabion) за подпорни стени и противонаводнителна защита.", desc: "Телени кошове, gabion конструкции за подпорни стени и противонаводнителна защита.",
    images: [asset("/images/gabion-1.png")],
    variants: [
      { name: "Габион 2×1×1 m", subtitle: "Тел ø4.00 | Поцинкован", specs: [] },
      { name: "Габион 2×1×0.5 m", subtitle: "Тел ø4.00 | Поцинкован", specs: [] },
      { name: "Габион по поръчка", subtitle: "Размери по спецификация", specs: [] },
    ] },
  { code: "12", groupKey: "constructions", title: "Портали & Врати", tagline: "Метални врати и портали за panel ограждения, боядисани по поръчка.", desc: "Метални конструкции от всякакъв вид — портали, врати, навеси.",
    images: [asset("/images/gates-painted-1.jpg"), asset("/images/gates-painted-2.jpg"), asset("/images/gates-painted-3.jpg")],
    variants: [
      { name: "Врата за панел ограда", subtitle: "Боядисана", specs: [["Ширина", "1,00–2,00 m"]] },
      { name: "Двукрила врата за панел", subtitle: "Боядисана", specs: [["Ширина", "3,00–6,00 m"]] },
      { name: "Плъзгаща врата", subtitle: "По поръчка | С механизъм", specs: [] },
    ] },
  { code: "13", groupKey: "equipment", title: "Ръчни колички & Инструменти", tagline: "Електростатично боядисани ръчни колички, каруцки и резервни части.", desc: "Електростатично боядисани ръчни колички, каруцки и резервни части.",
    images: [asset("/images/product-06.png"), asset("/images/wheelbarrow-norma-1.png"), asset("/images/wheelbarrow-norma-2.jpg"), asset("/images/wheelbarrow-norma-3.jpg")],
    variants: [
      { name: "Ръчна количка 80 L", subtitle: "Електростатично боядисана | Гума", specs: [] },
      { name: "Двуколка", subtitle: "Електростатично боядисана | Гума", specs: [] },
      { name: "Ръчна количка усилена", subtitle: "Двойно колело", specs: [] },
      { name: "Резервни части", subtitle: "Гуми, колела, оси", specs: [] },
    ] },
  { code: "14", groupKey: "constructions", title: "Ограждения", tagline: "Пълно изграждане на ограда за парцели, земеделски земи, военни обекти и фотоволтаични паркове.", desc: "Пълно изграждане на ограда за парцели, земеделски земи, военни обекти тип НАТО, фотоволтаични паркове.",
    images: [asset("/images/product-05.png"), asset("/images/norma-panel-2.png"), asset("/images/fencing-enhanced-1.png"), asset("/images/fencing-enhanced-2.png")],
    variants: [
      { name: "Ограда за парцел", subtitle: "Проектиране & монтаж по поръчка", specs: [] },
      { name: "Ограда за фотоволтаици", subtitle: "Панелна ограда с колючка", specs: [] },
      { name: "Военна ограда тип НАТО", subtitle: "С концертина & бодлива тел", specs: [] },
      { name: "Земеделска ограда", subtitle: "Chain-link или заварена мрежа", specs: [] },
      { name: "Ограда за животновъдство", subtitle: "Тежки мрежи & стълбове", specs: [] },
    ] },
  { code: "15", groupKey: "constructions", title: "Земеделски съоръжения", tagline: "Стълбове и оборудване за лозя, киви, аспержи и оранжерии.", desc: "Стълбове и оборудване за киви, аспержи, лозя, оранжерии.",
    images: [asset("/images/agricultural-1.png")],
    variants: [
      { name: "Стълбове за лозя", subtitle: "Поцинк.", specs: [["Височина", "1,80–2,50 m"]] },
      { name: "Стълбове за киви", subtitle: "Усилени", specs: [["Височина", "2,50–3,00 m"]] },
      { name: "Оборудване за оранжерии", subtitle: "Телове, клипсове, обтегачи", specs: [] },
    ] },
  { code: "16", groupKey: "constructions", title: "Декоративни конструкции", tagline: "Декоративни телени кошове и архитектурни решения с gabion за градски дизайн.", desc: "Декоративни телени кошове и архитектурни решения с gabion.",
    images: [asset("/images/decorative-1.png")],
    variants: [
      { name: "Декоративен габион", subtitle: "По поръчка | Различни форми", specs: [] },
      { name: "Габион кашпа / пейка", subtitle: "По поръчка | Градски дизайн", specs: [] },
    ] },
]

const categoriesEn = [
  { code: "01", groupKey: "mesh", title: "Welded Wire Mesh", desc: "Electrowelded wire mesh in rolls - full range of mesh sizes, heights and wire diameters.",
    images: [asset("/images/product-04.png"), asset("/images/pontarista-1.png"), asset("/images/pontarista-2.jpg"), asset("/images/pontarista-3.png")],
    variants: [
      { name: "Welded  60×100 mm (Ø 3.00/2.40)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 3.00 / 2.40 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 2.70/2.40)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 2.70 / 2.40 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 2.70/2.20)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 2.70 / 2.20 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 2.40/2.20)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 2.40 / 2.20 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 2.20/2.20)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 2.20 / 2.20 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 2.20/2.00)", subtitle: "Galvanized, 20m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 2.20 / 2.00 mm"], ["Roll length", "20m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  50×50 mm (Ø 2.00)", subtitle: "Galvanized, 25m roll", specs: [["Mesh", "50×50 mm"], ["Wire", "Ø 2.00 / 2.00 mm"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  50×50 mm (Ø 1.80)", subtitle: "Galvanized, 25m roll", specs: [["Mesh", "50×50 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  50×75 mm (Ø 2.00)", subtitle: "Galvanized, 25m roll", specs: [["Mesh", "50×75 mm"], ["Wire", "Ø 2.00 / 2.00 mm"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  50×75 mm (Ø 1.80)", subtitle: "Galvanized, 25m roll", specs: [["Mesh", "50×75 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  60×100 mm (Ø 1.80)", subtitle: "Galvanized, 25m roll", specs: [["Mesh", "60×100 mm"], ["Wire", "Ø 1.80 / 1.80 mm"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "Welded  PVC 50×100 mm (Ø 2.50)", subtitle: "PVC-coated RAL 6005 (green), 25mroll", specs: [["Mesh", "50×100 mm"], ["Wire", "Ø 2.50 mm PVC"], ["Color", "RAL 6005"], ["Roll length", "25m"], ["Heights", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
    ] },
  { code: "02", groupKey: "mesh", title: "Chain-Link Wire Mesh", desc: "Chain-link wire mesh in rolls, galvanized or PVC coated. Series «EVROS 1».",
    images: [asset("/images/product-01.jpg"), asset("/images/diktyota-1.jpg"), asset("/images/diktyota-2.png")],
    variants: [
      { name: "No 10 – Ø 1.5 mm", subtitle: "Grid 40×40 mm, 25m roll", specs: [["Wire diameter", "1.5 mm"], ["Mesh size", "40×40 mm"], ["Roll length", "25m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 12 – Ø 1.8 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 25m roll", specs: [["Wire diameter", "1.8 mm"], ["Mesh size", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "25m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 13 – Ø 2.0 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 25m roll", specs: [["Wire diameter", "2.0 mm"], ["Mesh size", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "25m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 14 – Ø 2.2 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 20m roll", specs: [["Wire diameter", "2.2 mm"], ["Mesh size", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "20m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 15 – Ø 2.4 mm", subtitle: "Grid 40×40 / 50×50 / 55×55 / 65×65 mm, 20m roll", specs: [["Wire diameter", "2.4 mm"], ["Mesh size", "40×40 – 50×50 – 55×55 – 65×65 mm"], ["Roll length", "20m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "No 17 – Ø 3.0 mm", subtitle: "Grid 50×50 / 55×55 / 65×65 mm, 10m roll", specs: [["Wire diameter", "3.0 mm"], ["Mesh size", "50×50 – 55×55 – 65×65 mm"], ["Roll length", "10m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
      { name: "PVC-Coated – Ø 2.60 mm", subtitle: "Grid 55×55 mm, 20m roll", specs: [["Wire diameter", "2.60 mm"], ["Mesh size", "55×55 mm"], ["Roll length", "20m"], ["Roll height", "1.00 – 1.20 – 1.50 – 1.80 – 2.00 m"]] },
    ] },
  { code: "03", groupKey: "mesh", title: "Galvanized Mesh Sheets", desc: "Welded galvanized mesh in sheets, 50 pcs/bundle.",
    images: [asset("/images/panel-galvanized-1.png"), asset("/images/panel-galvanized-2.png"), asset("/images/panel-galvanized-3.jpg")],
    variants: [
      { name: "Sheet Ø 3.00 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "3.00 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
      { name: "Sheet Ø 3.50 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "3.50 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
      { name: "Sheet Ø 4.00 mm", subtitle: "Galvanized, 50 pcs/bundle", specs: [["Wire thickness", "4.00 mm"], ["Dimensions", "2.00×5.00 m | 1.50×5.00 m"], ["Pieces/bundle", "50"]] },
    ] },
  { code: "04", groupKey: "mesh", title: "NORMA Panel – Powder-Coated & Galvanized", desc: "Galvanized and PVC-coated mesh in 2.50m panel sheets.", tagline: "Colors: RAL 6005 (green), 7043 (dark grey), 7045 (light grey).",
    images: [asset("/images/product-02.jpg"), asset("/images/norma-panel-1.png"), asset("/images/norma-panel-2.png"), asset("/images/norma-panel-3.jpg"), asset("/images/norma-panel-5.jpg"), asset("/images/norma-panel-4.png")],
    variants: [
      { name: "NORMA Panel PVC 50×100", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Mesh", "50×100 mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 50×100", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Mesh", "50×100 mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
      { name: "NORMA Panel PVC 55×200", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Mesh", "(55×100) + (55×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 55×200", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Mesh", "(55×100) + (55×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
      { name: "NORMA Panel PVC 70×200", subtitle: "Galvanized + PVC-coated, Ø 4.20 mm", specs: [["Wire diameter", "4.20 mm"], ["Mesh", "(70×100) + (70×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"], ["RAL colors", "6005 – 7043 – 7045"]] },
      { name: "Galvanized Panel 70×200", subtitle: "Galvanized, unpainted, Ø 4.00 mm", specs: [["Wire diameter", "4.00 mm"], ["Mesh", "(70×100) + (70×200) mm"], ["Dimensions (H×L)", "1.00×2.50 | 1.20×2.50 | 1.50×2.50 | 1.76×2.50 | 1.96×2.50 m"]] },
    ] },
  { code: "05", groupKey: "mesh", title: "Hexagonal Wire Mesh", desc: "Classic hexagonal mesh for poultry farms, gardens and light fencing.",
    images: [asset("/images/hexagonal-1.png")],
    variants: [
      { name: "No 2.5 – Ø 0.70 mm – Grid 1/2\"", subtitle: "Galvanized, 25m roll", specs: [["Wire diameter", "0.70 mm"], ["Mesh", "1/2\" (13 mm)"], ["Roll length", "25m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.90 mm – Grid 1\"", subtitle: "Galvanized, 50m roll", specs: [["Wire diameter", "0.90 mm"], ["Mesh", "1\" (25 mm)"], ["Roll length", "50m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.90 mm – Grid 2\"", subtitle: "Galvanized, 50m roll", specs: [["Wire diameter", "0.90 mm"], ["Mesh", "2\" (50 mm)"], ["Roll length", "50m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 2.5 – Ø 0.60 mm – Grid 1/2\" (light)", subtitle: "Galvanized, 20m roll", specs: [["Wire diameter", "0.60 mm"], ["Mesh", "1/2\" (13 mm)"], ["Roll length", "20m "], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
      { name: "No 4 – Ø 0.60 mm – Grid 1\" (light)", subtitle: "Galvanized, 20m roll", specs: [["Wire diameter", "0.60 mm"], ["Mesh", "1\" (25 mm)"], ["Roll length", "20m"], ["Roll height", "0.80 – 1.00 – 1.20 – 1.50 m"]] },
    ] },
  { code: "06", groupKey: "security", title: "Barbed Wire",  desc: "Galvanized barbed wire in 50m or 100m rolls.",
    images: [asset("/images/product-03.png")],
    variants: [
      { name: "No 11/4 – Ø 1.60 mm", subtitle: "100m roll", specs: [["Wire thickness", "1.60 mm"], ["Roll length", "100m"]] },
      { name: "No 12/4 – Ø 1.80 mm", subtitle: "50m or 100m roll", specs: [["Wire thickness", "1.80 mm"], ["Roll length", "50m | 100m"]] },
      { name: "No 13/4 – Ø 2.00 mm", subtitle: "50m or 100m roll", specs: [["Wire thickness", "2.00 mm"], ["Roll length", "50m | 100m"]] },
      { name: "No 14/4 – Ø 2.20 mm", subtitle: "50m or 100m roll", specs: [["Wire thickness", "2.20 mm"], ["Roll length", "50m | 100m"]] },
    ] },
  { code: "07", groupKey: "security", title: "Concertina Wire (NATO Type)",  desc: "NATO-type security concertina wire, galvanized.",
    images: [asset("/images/concertina-1.png")],
    variants: [
      { name: "Concertina Ø 200 mm", subtitle: "56 coils, 12m extension", specs: [["Roll diameter", "200 mm"], ["Coils", "56"], ["Opening", "12m"], ["Blade diameter/opening", "150 mm"]] },
      { name: "Concertina Ø 300 mm", subtitle: "56 coils, 6m extension", specs: [["Roll diameter", "300 mm"], ["Coils", "56"], ["Opening", "6m"], ["Blade diameter/opening", "200 mm"]] },
      { name: "Concertina Ø 500 mm", subtitle: "56 coils, 8m extension, ~7 kg", specs: [["Roll diameter", "500 mm"], ["Coils", "56"], ["Opening", "8m"], ["Blade diameter/opening", "400 mm"], ["Roll weight", "~7 kg"]] },
      { name: "Concertina Ø 950 mm", subtitle: "56 coils, 13m extension, ~14 kg", specs: [["Roll diameter", "950 mm"], ["Coils", "56"], ["Opening", "13m"], ["Blade diameter/opening", "800 mm"], ["Roll weight", "~14 kg"]] },
    ] },
  { code: "08", groupKey: "materials", title: "Wires",  desc: "Galvanized, black, straight, baling wire - for every use.",
    images: [asset("/images/wire-1.png")],
    variants: [
      { name: "Hot-dip galvanized wire", subtitle: "In coils, full range of diameters", specs: [["Diameter", "0.90 – 1.20 – 1.50 – 1.80 – 2.00 – 2.20 – 2.40 – 2.70 – 3.00 – 3.90 – 4.00 mm"], ["Finish", "Hot-dip galvanized"], ["Packaging", "Coil"]] },
      { name: "PVC-coated wire", subtitle: "Galvanized with PVC coating", specs: [["Diameter", "2.60 mm"], ["Colors", "Green, Black"]] },
      { name: "Straight galvanized wire", subtitle: "Cut into rods", specs: [["Diameter", "2.20 – 2.70 – 3.00 – 3.50 – 4.00 mm"], ["Bar length", "Custom"], ["Finish", "Hot-dip galvanized"]] },
      { name: "Black wire", subtitle: "For construction work & tying", specs: [["Diameter", "1.20 – 1.50 – 1.60 – 1.80 – 2.00 – 2.20 – 2.40 – 2.60 – 2.70 – 3.00 – 3.30 mm"], ["Packaging", "Coil or 2 kg pack"]] },
      { name: "Black baling wire", subtitle: "Agricultural use", specs: [["Diameter", "1.80 mm"], ["Coil weight", "40–45 kg"]] },
      { name: "Straight galvanized wire (rods)", subtitle: "Cut in bars for fencing & constructions", specs: [["Thickness", "4–5 mm"], ["Bar height", "1.00 – 3.00 m"]] },
    ] },
  { code: "09", groupKey: "materials", title: "Posts & Tubes",  desc: "Hollow sections, galvanized tubes and angle bars for fence support.",
    images: [asset("/images/posts-tubes-1.jpg"), asset("/images/posts-painted-2.jpg"), asset("/images/posts-painted-3.jpg"), asset("/images/posts-tubes-4.jpg"), asset("/images/posts-angles-5.jpg")],
    variants: [
      { name: "Square Post 50x50 PVC-Coated – 2.00 mm thick", subtitle: "With base plate, PVC-coated", specs: [["Dimensions", "50×50 mm"], ["Thickness", "2.00 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 PVC-Coated – 1.50 mm thick", subtitle: "With base plate, PVC-coated", specs: [["Dimensions", "50×50 mm"], ["Thickness", "1.50 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 Galvanized – 2.00 mm thick", subtitle: "With base plate, galvanized", specs: [["Dimensions", "50×50 mm"], ["Thickness", "2.00 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Square Post 50x50 Galvanized – 1.50 mm thick", subtitle: "With base plate, galvanized", specs: [["Dimensions", "50×50 mm"], ["Thickness", "1.50 mm"], ["Available heights", "1.00 – 1.20 – 1.50 – 1.76 – 1.96 m"]] },
      { name: "Galvanized post pipes", subtitle: "Hot-dip galvanized, with base", specs: [["Diameter", "Ø42 – Ø48 – Ø60 mm"], ["Wall thickness", "1.50 – 2.00 mm"], ["Height", "1.50 – 2.00 – 2.50 m"], ["Finish", "Hot-dip galvanized"]] },
      { name: "Angle iron posts", subtitle: "Corner posts, various sizes", specs: [["Dimensions", "30x30 – 40x40 – 50x50 mm"], ["Height", "1.00 – 1.50 – 2.00 m"], ["Thickness", "3.00 – 4.00 mm"]] },
      { name: "Caps, Clips & Fasteners", subtitle: "Mesh connection accessories", specs: [["Caps", "50x50 mm – 60x40 mm"], ["Connection clips", "For panel mesh"], ["PVC clip connectors", "For connecting mesh"], ["Plastic cap", "For 50x50 mm post"], ["Metal screws", "10x100 mm"], ["Anchors", "M8 – M10 – M12"]] },
    ] },
  { code: "10", groupKey: "materials", title: "Nails & Pins", desc: "Construction nails, steel nails, staples, forks and pins.",
    images: [asset("/images/nails-1.png")],
    variants: [
      { name: "Construction nails", subtitle: "Full size range, 5 kg box packaging", specs: [["No.4", "2.50 mm × 40 mm"], ["No.5", "2.80 mm × 50 mm"], ["No.6", "2.80 mm × 60 mm"], ["No.7", "3.00 mm × 70 mm"], ["No.8", "3.50 mm × 80 mm"], ["No.10", "4.00 mm × 100 mm"], ["No.11", "4.00 mm × 110 mm"], ["No.12", "4.00 mm × 120 mm"], ["No.15", "5.00 mm × 150 mm"], ["No.18", "6.00 mm × 180 mm"], ["No.20", "6.00 mm × 200 mm"], ["Packaging", "5 kg box"]] },
      { name: "Steel nails", subtitle: "Hardened, for concrete", specs: [["Length", "25 – 30 – 40 – 50 – 60 mm"], ["Material", "Hardened steel"]] },
      { name: "Staples", subtitle: "Galvanized, for fence wire", specs: [["Length", "25 – 30 – 40 mm"], ["Finish", "Galvanized"]] },
      { name: "Headless pins", subtitle: "For wooden constructions", specs: [["Length", "20 – 25 – 30 – 40 – 50 mm"], ["Thickness", "1.00 – 1.40 mm"]] },
      { name: "Flat-head pins", subtitle: "For upholstery & cladding", specs: [["Length", "10 – 15 – 20 – 25 mm"], ["Thickness", "1.00 mm"]] },
    ] },
  { code: "11", groupKey: "constructions", title: "Flood Protection & Gabion", desc: "Wire cages, gabion retaining structures and flood protection.",
    images: [asset("/images/gabion-1.png")],
    variants: [
      { name: "Heavy-galvanized flood-control wire cage", subtitle: "Flood protection / retaining", specs: [["Dimensions", "Made to order"], ["Wire thickness", "4.00 – 5.00 mm"], ["Mesh size", "50x100 mm"], ["Finish", "Galvanized / Galfan"]] },
      { name: "Heavy-galvanized flood-control mesh roll", subtitle: "For on-site gabion construction", specs: [["Wire thickness", "3.00 mm"], ["Height", "0.50 – 1.00 – 2.00 m"], ["Roll length", "25 – 50 m"]] },
      { name: "Flood protection box", subtitle: "Ready to use, galvanized", specs: [["Dimensions", "2x1x1 m | 2x1x0.5 m | 3x1x1 m"], ["Wire thickness", "3.00 – 4.00 mm"]] },
    ] },
  { code: "12", groupKey: "constructions", title: "Railings & Gates - Powder Coated",  desc: "Metal constructions of all types - railings, gates, shelters.",
    images: [asset("/images/gates-painted-1.jpg"), asset("/images/gates-painted-2.jpg"), asset("/images/gates-painted-3.jpg")],
    variants: [
      { name: "Railings", subtitle: "Custom made, metal", specs: [["Material", "Iron or aluminum"], ["Manufacturing", "Custom"]] },
      { name: "Metal gates", subtitle: "Single & double leaf, for fencing", specs: [["Type", "Single or double leaf"], ["Width", "1.00 – 1.50 – 2.00 – 3.00 – 4.00 m"], ["Height", "1.00 – 1.50 – 2.00 m"], ["Finish", "Galvanized or powder coated"]] },
      { name: "Sheds", subtitle: "Metal constructions", specs: [["Manufacturing", "Custom"], ["Material", "Galvanized pipes & square posts"]] },
    ] },
  { code: "13", groupKey: "equipment", title: "Wheelbarrows & Tools", desc: "Powder-coated wheelbarrows, trolleys and spare parts.",
    images: [asset("/images/product-06.png"), asset("/images/wheelbarrow-norma-1.png"), asset("/images/wheelbarrow-norma-2.jpg"), asset("/images/wheelbarrow-norma-3.jpg")],
    variants: [
      { name: "Standard NORMA No 1 Wheelbarrow", subtitle: "Powder-coated wheelbarrow", specs: [["Type", "Standard"], ["Wheel", "Pneumatic"], ["Finish", "Powder-coated"]]},
      { name: "Heavy-duty NORMA No 3 Wheelbarrow", subtitle: "Heavy-duty, reinforced frame", specs: [["Type", "Heavy-duty reinforced"], ["Wheel", "Pneumatic or solid"], ["Finish", "Powder-coated"]] },
      { name: "Two-wheel trolley", subtitle: "Pneumatic or solid wheels", specs: [["Wheels", "2 - pneumatic or solid"], ["Use", "Agricultural / construction"]] },
      { name: "Wheelbarrow spare parts", subtitle: "Wheels, tires, buckets", specs: [["Wheels", "Pneumatic or solid"], ["Buckets", "Plastic or metal"], ["Tires", "Various sizes"]] },
    ] },
  { code: "14", groupKey: "constructions", title: "Fencing Construction", desc: "Complete fencing construction for plots, agricultural land, NATO-type military installations, solar parks, livestock farms. Our specialized crews undertake the full construction and installation of every fence, customized to client specifications.",
    images: [asset("/images/product-05.png"), asset("/images/norma-panel-2.png"), asset("/images/fencing-enhanced-1.png"), asset("/images/fencing-enhanced-2.png")],
    variants: [
      { name: "Plot fencing", subtitle: "Full construction with panel or mesh", specs: [["Types", "Powder-coated panel, welded, chain-link"], ["Posts", "\t50×50 hollow sections, tubes, angle bars"], ["Accessories", "Clips, caps, screws, tensioners"]] },
      { name: "Agricultural land fencing", subtitle: "Durable construction for agricultural use", specs: [["Materials", "Welded or chain-link mesh"], ["Support", "Angle bars or galvanized tubes"]] },
      { name: "NATO-type military installation fencing", subtitle: "High security with concertina wire", specs: [["Type", "Mesh + barbed wire + concertina"], ["Security", "NATO type"]] },
      { name: "Solar park fencing", subtitle: "Construction according to specifications", specs: [["Type", "Panel or galvanized mesh"], ["Height", "Custom"]] },
      { name: "Livestock farm fencing", subtitle: "Special constructions for livestock", specs: [["Materials", "Welded mesh, angle irons"], ["Type", "Durable construction"]] },
    ] },
  { code: "15", groupKey: "constructions", title: "Agricultural Installations", desc: "Posts and equipment for kiwi, asparagus, vineyards and greenhouses.",
    images: [asset("/images/agricultural-1.png")],
    variants: [
      { name: "Farmland post support", subtitle: "For kiwi, asparagus, vineyards", specs: [["Material", "Galvanized tubes & hollow sections"], ["Height", "1.50 – 2.00 – 2.50 – 3.00 m"], ["Manufacturing", "Custom"]] },
      { name: "Greenhouses", subtitle: "Metal frame, galvanized", specs: [["Frame", "Galvanized tubes"], ["Type", "Tunnel or polycarbonate"], ["Manufacturing", "Custom"]] },
      { name: "Vineyard equipment", subtitle: "Posts, wires, tensioners", specs: [["Posts", "Angle bars or tubes"], ["Tension wire", "Galvanized 2.20 – 2.70 mm"], ["Tensioners", "Metal"]] },
    ] },
  { code: "16", groupKey: "constructions", title: "Decorative Constructions", desc: "Decorative wire baskets and architectural solutions with gabion.",
    images: [asset("/images/decorative-1.png")],
    variants: [
      { name: "Decorative gabion «KORINA»", subtitle: "For gardens, landscaping & outdoor spaces", specs: [["Type", "Box or column"], ["Dimensions", "Custom"], ["Wire thickness", "3.00 – 4.00 mm"], ["Filling", "Natural stone, pebbles"]] },
      { name: "Retaining walls", subtitle: "With natural stone, gabion system", specs: [["Height", "0.50 – 1.00 – 2.00+ m"], ["Width", "0.30 – 0.50 – 1.00 m"], ["Length", "Custom"]] },
    ] },
];

const categoryAnchors = {
  "01": "zavareni",
  "02": "pleteni",
  "03": "poc-list",
  "04": "panel",
  "05": "shestoagalna",
  "06": "bodliva",
  "07": "kordon",
  "08": "tel",
  "09": "kolove-tribi",
  "10": "pironi-igli",
  "11": "gabioni",
  "12": "parapeti-vrati",
  "13": "kolichki",
  "14": "izgrazhdane-ogradi",
  "15": "zemedelski",
  "16": "dekorativni",
};

const SITE_PRODUCTS_URL = "https://www.evros-mreja.com/products";

const groupKeys = ["all", "mesh", "security", "materials", "constructions", "equipment"];
const groupLabels = {
  bg: { all: "Всички", mesh: "Мрежи", security: "Сигурност", materials: "Материали", constructions: "Конструкции", equipment: "Оборудване" },
  en: { all: "All", mesh: "Mesh", security: "Security", materials: "Materials", constructions: "Constructions", equipment: "Equipment" },
};

function ImageCarousel({ images, alt, labels }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function prev(e) {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next(e) {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative w-full h-40 border-b border-ink/10 overflow-hidden group">
      <img src={images[index]} alt={`${alt} — снимка на продукт ${index + 1}`} className="w-full h-full object-cover" />
      {hasMultiple && (
        <>
          <button onClick={prev} aria-label={labels.prevImage} className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ‹
          </button>
          <button onClick={next} aria-label={labels.nextImage} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ›
          </button>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductCatalogue() {
  const { lang, t } = useLanguage();
  const categories = lang === "en" ? categoriesEn : categoriesBg;
  const [activeGroup, setActiveGroup] = useState("all");
  const [openCodes, setOpenCodes] = useState(new Set());
  const [copiedAnchor, setCopiedAnchor] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  function toggleCode(code) {
    setOpenCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  const filtered = activeGroup === "all" ? categories : categories.filter((c) => c.groupKey === activeGroup);

  async function copyCategoryLink(anchorId) {
    const url = `${SITE_PRODUCTS_URL}#${anchorId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    const successMessage = lang === "en" ? "The link was copied successfully." : "Връзката е копирана успешно.";
    setToastMessage(successMessage);
    setCopiedAnchor(anchorId);
    window.setTimeout(() => setCopiedAnchor((current) => (current === anchorId ? null : current)), 1800);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": lang === "en" ? "NORMA S.A. Product Categories" : "Категории продукти NORMA S.A.",
    "url": SITE_PRODUCTS_URL,
    "numberOfItems": categories.length,
    "itemListElement": categories.map((cat, index) => {
      const anchorId = categoryAnchors[cat.code];
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": cat.title,
        "url": `${SITE_PRODUCTS_URL}#${anchorId}`,
      };
    }),
  };

  const catalogueLabels = {
    prevImage: lang === "en" ? "Previous image" : "Предишна снимка",
    nextImage: lang === "en" ? "Next image" : "Следваща снимка",
  };

  return (
    <div>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <div className="bg-ink pt-32 pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/" className="font-mono text-xs text-accent hover:underline">
            {lang === "en" ? "← Home" : "← Начало"}
          </Link>
          <h1 className="font-display font-700 text-3xl md:text-4xl text-white mt-4">
            {lang === "en" ? "Product Catalogue" : "Каталог на продуктите"}
          </h1>
          <p className="text-white/60 mt-2 max-w-xl">
            {lang === "en"
              ? "Full range of wire mesh, fencing and metal construction products."
              : "Пълна гама продукти от телени изделия, ограждения и метални конструкции."}
          </p>
        </div>
      </div>

      <div className="bg-paper border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-2">
          {groupKeys.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeGroup === g ? "bg-accent text-white" : "bg-white text-steel border border-ink/10 hover:bg-ink/[0.03]"
              }`}
            >
              {groupLabels[lang][g]}
            </button>
          ))}
          <span className="font-mono text-xs text-steel ml-2">
            {filtered.length} {lang === "en" ? "categories" : "категории"}
          </span>
        </div>
      </div>

      <div className="bg-paper py-10">
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-300/80 bg-[#dff6e8] px-4 py-3 text-sm font-medium text-emerald-900 shadow-lg shadow-emerald-900/10 animate-toast"
          >
            {toastMessage}
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filtered.map((cat) => {
            const isOpen = openCodes.has(cat.code);
            const anchorId = categoryAnchors[cat.code];
            const seoDescription = [cat.tagline, cat.desc].filter(Boolean).join(" ");
            const isCopied = copiedAnchor === anchorId;
            return (
              <section id={anchorId} key={cat.code} className="bg-tag border border-ink/12 rounded-sm overflow-hidden flex flex-col scroll-mt-28">
                <ImageCarousel
                  images={cat.images}
                  alt={`${cat.title}. ${seoDescription}`}
                  labels={catalogueLabels}
                />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="font-display font-600 text-lg text-ink">{cat.title}</h2>
                    <button
                      type="button"
                      onClick={() => copyCategoryLink(anchorId)}
                      aria-label={lang === "en" ? `Copy link to ${cat.title}` : `Копиране на връзка към ${cat.title}`}
                      title={lang === "en" ? "Copy section link" : "Копиране на връзка към секцията"}
                      className={`relative shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        isCopied
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-ink/10 bg-white text-steel hover:text-accent hover:border-accent/40"
                      }`}
                    >
                      <Link2 size={15} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>

                  {cat.tagline && (
                    <p className="text-ink text-xs font-semibold leading-relaxed">{cat.tagline}</p>
                  )}
                  {cat.desc && (
                    <p className={`text-steel text-xs leading-relaxed ${cat.tagline ? "mt-2" : "mt-0"}`}>{cat.desc}</p>
                  )}

                  <button
                    onClick={() => toggleCode(cat.code)}
                    className="text-accent text-sm font-semibold flex items-center gap-1 hover:underline self-start mt-3"
                  >
                    {lang === "en" ? `View ${cat.variants.length} products` : `Вижте ${cat.variants.length} продукта`}
                    <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>⌄</span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 space-y-3">
                      {cat.variants.map((v, vi) => (
                        <div key={vi} className="bg-white border border-ink/10 rounded-sm overflow-hidden">
                          <div className="p-3 pb-2">
                            <div className="font-semibold text-sm text-ink mb-0.5">{v.name}</div>
                            <div className="text-xs text-ink/75 font-medium">{v.subtitle}</div>
                          </div>
                          <table className="w-full border-t border-ink/10">
                            <tbody>
                              {v.specs.map(([label, value], si) => (
                                <tr key={si} className={si % 2 === 1 ? "bg-paper/60" : ""}>
                                  <td className="py-1.5 pl-3 pr-2 text-[11px] uppercase tracking-wide text-ink/70 font-semibold font-mono whitespace-nowrap align-top w-[38%]">
                                    {label}
                                  </td>
                                  <td className="py-1.5 pr-3 text-sm text-ink font-medium border-l border-ink/10 pl-2">{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-6">
          <div className="bg-ink rounded-sm p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-2">
              {lang === "en" ? "Need a quote?" : "Нужна ви е оферта?"}
            </h3>
            <p className="text-white/60 text-sm mb-5">
              {lang === "en"
                ? "Contact us for wholesale prices, custom orders and installation."
                : "Свържете се с нас за цени на едро, персонализирани поръчки и монтаж."}
            </p>
            <Link to="/#contact" className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-full transition-colors">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
