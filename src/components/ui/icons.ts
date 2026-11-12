/**
 * İkon kaydı. Yalnızca burada listelenen ikonlar siteye girer (Lucide, ISC lisansı).
 * Yeni ikon: lucide.dev'den adını bul, aşağıya bir import ve bir satır ekle.
 */
import arrowLeftRight from 'lucide-static/icons/arrow-left-right.svg?raw';
import badgeCheck from 'lucide-static/icons/badge-check.svg?raw';
import bath from 'lucide-static/icons/bath.svg?raw';
import bedDouble from 'lucide-static/icons/bed-double.svg?raw';
import bookOpen from 'lucide-static/icons/book-open.svg?raw';
import bookmark from 'lucide-static/icons/bookmark.svg?raw';
import briefcase from 'lucide-static/icons/briefcase.svg?raw';
import building2 from 'lucide-static/icons/building-2.svg?raw';
import calculator from 'lucide-static/icons/calculator.svg?raw';
import calendar from 'lucide-static/icons/calendar.svg?raw';
import camera from 'lucide-static/icons/camera.svg?raw';
import car from 'lucide-static/icons/car.svg?raw';
import carFront from 'lucide-static/icons/car-front.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';
import chevronDown from 'lucide-static/icons/chevron-down.svg?raw';
import chevronRight from 'lucide-static/icons/chevron-right.svg?raw';
import circleUser from 'lucide-static/icons/circle-user.svg?raw';
import clock from 'lucide-static/icons/clock.svg?raw';
import fileSearch from 'lucide-static/icons/file-search.svg?raw';
import flag from 'lucide-static/icons/flag.svg?raw';
import gauge from 'lucide-static/icons/gauge.svg?raw';
import globe from 'lucide-static/icons/globe.svg?raw';
import graduationCap from 'lucide-static/icons/graduation-cap.svg?raw';
import hammer from 'lucide-static/icons/hammer.svg?raw';
import handHeart from 'lucide-static/icons/hand-heart.svg?raw';
import heart from 'lucide-static/icons/heart.svg?raw';
import house from 'lucide-static/icons/house.svg?raw';
import layoutGrid from 'lucide-static/icons/layout-grid.svg?raw';
import list from 'lucide-static/icons/list.svg?raw';
import map from 'lucide-static/icons/map.svg?raw';
import mapPin from 'lucide-static/icons/map-pin.svg?raw';
import menu from 'lucide-static/icons/menu.svg?raw';
import messageCircle from 'lucide-static/icons/message-circle.svg?raw';
import pawPrint from 'lucide-static/icons/paw-print.svg?raw';
import percent from 'lucide-static/icons/percent.svg?raw';
import phone from 'lucide-static/icons/phone.svg?raw';
import plus from 'lucide-static/icons/plus.svg?raw';
import search from 'lucide-static/icons/search.svg?raw';
import share2 from 'lucide-static/icons/share-2.svg?raw';
import shieldCheck from 'lucide-static/icons/shield-check.svg?raw';
import shoppingBag from 'lucide-static/icons/shopping-bag.svg?raw';
import slidersHorizontal from 'lucide-static/icons/sliders-horizontal.svg?raw';
import sparkles from 'lucide-static/icons/sparkles.svg?raw';
import tractor from 'lucide-static/icons/tractor.svg?raw';
import trendingUp from 'lucide-static/icons/trending-up.svg?raw';
import userSearch from 'lucide-static/icons/user-search.svg?raw';
import wrench from 'lucide-static/icons/wrench.svg?raw';
import x from 'lucide-static/icons/x.svg?raw';
import zap from 'lucide-static/icons/zap.svg?raw';

export const icons = {
  'arrow-left-right': arrowLeftRight,
  'badge-check': badgeCheck,
  bath,
  'bed-double': bedDouble,
  'book-open': bookOpen,
  bookmark,
  briefcase,
  'building-2': building2,
  calculator,
  calendar,
  camera,
  car,
  'car-front': carFront,
  check,
  'chevron-down': chevronDown,
  'chevron-right': chevronRight,
  'circle-user': circleUser,
  clock,
  'file-search': fileSearch,
  flag,
  gauge,
  globe,
  'graduation-cap': graduationCap,
  hammer,
  'hand-heart': handHeart,
  heart,
  house,
  'layout-grid': layoutGrid,
  list,
  map,
  'map-pin': mapPin,
  menu,
  'message-circle': messageCircle,
  'paw-print': pawPrint,
  percent,
  phone,
  plus,
  search,
  'share-2': share2,
  'shield-check': shieldCheck,
  'shopping-bag': shoppingBag,
  'sliders-horizontal': slidersHorizontal,
  sparkles,
  tractor,
  'trending-up': trendingUp,
  'user-search': userSearch,
  wrench,
  x,
  zap,
} as const;

export type IconName = keyof typeof icons;
