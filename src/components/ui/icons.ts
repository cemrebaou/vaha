/**
 * İkon kaydı. Yalnızca burada listelenen ikonlar siteye girer (Lucide, ISC lisansı).
 * Yeni ikon: lucide.dev'den adını bul, aşağıya bir import ve bir satır ekle.
 */
import badgeCheck from 'lucide-static/icons/badge-check.svg?raw';
import bath from 'lucide-static/icons/bath.svg?raw';
import bedDouble from 'lucide-static/icons/bed-double.svg?raw';
import bike from 'lucide-static/icons/bike.svg?raw';
import briefcase from 'lucide-static/icons/briefcase.svg?raw';
import building2 from 'lucide-static/icons/building-2.svg?raw';
import calendar from 'lucide-static/icons/calendar.svg?raw';
import camera from 'lucide-static/icons/camera.svg?raw';
import car from 'lucide-static/icons/car.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';
import chevronDown from 'lucide-static/icons/chevron-down.svg?raw';
import chevronRight from 'lucide-static/icons/chevron-right.svg?raw';
import circleUser from 'lucide-static/icons/circle-user.svg?raw';
import flag from 'lucide-static/icons/flag.svg?raw';
import gauge from 'lucide-static/icons/gauge.svg?raw';
import globe from 'lucide-static/icons/globe.svg?raw';
import heart from 'lucide-static/icons/heart.svg?raw';
import house from 'lucide-static/icons/house.svg?raw';
import map from 'lucide-static/icons/map.svg?raw';
import mapPin from 'lucide-static/icons/map-pin.svg?raw';
import menu from 'lucide-static/icons/menu.svg?raw';
import messageCircle from 'lucide-static/icons/message-circle.svg?raw';
import phone from 'lucide-static/icons/phone.svg?raw';
import plus from 'lucide-static/icons/plus.svg?raw';
import ruler from 'lucide-static/icons/ruler.svg?raw';
import search from 'lucide-static/icons/search.svg?raw';
import share2 from 'lucide-static/icons/share-2.svg?raw';
import shieldCheck from 'lucide-static/icons/shield-check.svg?raw';
import shirt from 'lucide-static/icons/shirt.svg?raw';
import slidersHorizontal from 'lucide-static/icons/sliders-horizontal.svg?raw';
import smartphone from 'lucide-static/icons/smartphone.svg?raw';
import sofa from 'lucide-static/icons/sofa.svg?raw';
import wrench from 'lucide-static/icons/wrench.svg?raw';
import x from 'lucide-static/icons/x.svg?raw';

export const icons = {
  'badge-check': badgeCheck,
  bath,
  'bed-double': bedDouble,
  bike,
  briefcase,
  'building-2': building2,
  calendar,
  camera,
  car,
  check,
  'chevron-down': chevronDown,
  'chevron-right': chevronRight,
  'circle-user': circleUser,
  flag,
  gauge,
  globe,
  heart,
  house,
  map,
  'map-pin': mapPin,
  menu,
  'message-circle': messageCircle,
  phone,
  plus,
  ruler,
  search,
  'share-2': share2,
  'shield-check': shieldCheck,
  shirt,
  'sliders-horizontal': slidersHorizontal,
  smartphone,
  sofa,
  wrench,
  x,
} as const;

export type IconName = keyof typeof icons;
