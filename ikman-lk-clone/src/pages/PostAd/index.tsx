import React, { useState } from 'react';
import { PostAdForm } from './PostAdForm';

const DM = "'DM Sans', 'Open Sans', Arial, sans-serif";

const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
    <path d="M5.96 3.102a.562.562 0 1 0-.795.796L9.267 8l-4.102 4.102a.562.562 0 1 0 .795.796l4.5-4.5a.562.562 0 0 0 0-.796l-4.5-4.5z" fill="#000" />
  </svg>
);

const SellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, overflow: 'hidden' }}>
    <g fillRule="evenodd">
      <g transform="translate(-12 -14)">
        <path d="M14.032 29.803c0 .714.57 1.293 1.275 1.293h17.857c.705 0 1.276-.579 1.276-1.293v-7.757c0-.714-.571-.647-1.276-.647H15.307c-.705 0-1.275-.067-1.275.647v7.757" fill="#0F886E" />
        <path d="M14.032 28.51c0 .715.57 1.293 1.275 1.293h17.857c.705 0 1.276-.578 1.276-1.292v-7.112c0-.714-.571-1.293-1.276-1.293H15.307c-.705 0-1.275.58-1.275 1.293v7.112" fill="#0B9D7E" />
        <path d="M14.032 27.218c0 .714.57 1.293 1.275 1.293h17.857c.705 0 1.276-.58 1.276-1.293v-7.112c0-.714-.571-1.292-1.276-1.292H15.307c-.705 0-1.275.578-1.275 1.292v7.112" fill="#0F886E" />
        <path d="M14.032 25.925c0 .714.57 1.293 1.275 1.293h17.857c.705 0 1.276-.58 1.276-1.293v-7.111c0-.714-.571-1.293-1.276-1.293H15.307c-.705 0-1.275.579-1.275 1.293v7.11" fill="#0B9D7E" />
        <path d="M14.032 24.632c0 .714.57 1.293 1.275 1.293h17.857c.705 0 1.276-.58 1.276-1.293V18.49c0-.714-.571-1.293-1.276-1.293H15.307c-.705 0-1.275.58-1.275 1.293v6.142" fill="#0F886E" />
        <path d="M14.032 23.339c0 .714.57 1.293 1.275 1.293h17.857c.705 0 1.276-.58 1.276-1.293V18.49c0-.714-.571-1.293-1.276-1.293H15.307c-.704 0-1.275.58-1.275 1.293v4.849" fill="#0B9D7E" />
        <path d="M27.743 20.753c0 1.428-1.57 2.586-3.507 2.586-1.938 0-3.508-1.158-3.508-2.586s1.57-2.586 3.508-2.586c1.937 0 3.507 1.158 3.507 2.586" fill="#0F886E" />
        <path d="M29.652 31.096h.642v1.293h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.293h5.735" fill="#D7A156" />
        <path d="M30.294 31.096c0 .893-1.427 1.617-3.188 1.617-1.761 0-3.19-.724-3.19-1.617 0-.892 1.429-1.616 3.19-1.616 1.76 0 3.188.724 3.188 1.616" fill="#FFCE28" />
        <path d="M27.106 30.127c1.277 0 2.232.512 2.232.97 0 .457-.955.97-2.232.97-1.278 0-2.232-.513-2.232-.97 0-.458.954-.97 2.232-.97m0-.324c-1.41 0-2.551.58-2.551 1.293 0 .714 1.142 1.293 2.55 1.293 1.41 0 2.552-.579 2.552-1.293s-1.142-1.293-2.551-1.293" fill="#D7A156" />
        <path d="M30.294 31.096c0 .893-1.427 1.617-3.188 1.617v.97c1.542 0 2.829-.556 3.124-1.294h.064v-1.293" fill="#C89650" />
        <path d="M22 32.713h.641v1.292h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.292h5.735" fill="#D7A156" />
        <path d="M22 31.743h.641v1.293h-.064c-.295.737-1.582 1.293-3.124 1.293-1.543 0-2.83-.556-3.125-1.293h-.064v-1.293h5.735" fill="#FFCE28" />
        <path d="M22 30.773h.641v1.293h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.293h5.735" fill="#D7A156" />
        <path d="M22 29.803h.641v1.293h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.293h5.735" fill="#FFCE28" />
        <path d="M22 28.834h.641v1.293h-.064c-.295.737-1.582 1.293-3.124 1.293-1.543 0-2.83-.556-3.125-1.293h-.064v-1.293h5.735" fill="#D7A156" />
        <path d="M22 27.864h.641v1.293h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.293h5.735" fill="#FFCE28" />
        <path d="M22 26.894h.641v1.293h-.064c-.295.738-1.582 1.293-3.124 1.293-1.543 0-2.83-.555-3.125-1.293h-.064v-1.293h5.735" fill="#D7A156" />
        <path d="M22.641 26.894c0 .893-1.427 1.617-3.188 1.617-1.762 0-3.19-.724-3.19-1.617 0-.892 1.428-1.616 3.19-1.616 1.76 0 3.188.724 3.188 1.616" fill="#FFCE28" />
        <path d="M19.453 25.925c1.277 0 2.232.512 2.232.97 0 .457-.955.969-2.232.969-1.278 0-2.233-.512-2.233-.97 0-.457.955-.97 2.233-.97m0-.323c-1.41 0-2.552.58-2.552 1.293 0 .714 1.142 1.293 2.552 1.293 1.408 0 2.55-.579 2.55-1.293s-1.142-1.293-2.55-1.293" fill="#D7A156" />
        <path d="M22.641 33.036h-.064c-.295.737-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.556 3.124-1.294h.064v-.97" fill="#CA9851" />
        <path d="M22.641 32.066h-.064c-.295.738-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.556 3.124-1.293h.064v-.97" fill="#F0C226" />
        <path d="M22.641 31.096h-.064c-.295.738-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.555 3.124-1.293h.064v-.97" fill="#CA9851" />
        <path d="M22.641 30.127h-.064c-.295.737-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.556 3.124-1.294h.064v-.97" fill="#F0C226" />
        <path d="M22.641 29.157h-.064c-.295.738-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.556 3.124-1.293h.064v-.97" fill="#CA9851" />
        <path d="M22.641 28.187h-.064c-.295.738-1.582 1.293-3.124 1.293v.97c1.542 0 2.829-.555 3.124-1.293h.064v-.97" fill="#F0C226" />
        <path d="M22.641 26.894c0 .893-1.427 1.617-3.188 1.617v.97c1.542 0 2.829-.556 3.124-1.294h.064v-1.293" fill="#CA9851" />
        <path d="M20.295 22.692h-2.437c0-.649-.714-1.234-1.594-1.234v-1.41c.88 0 1.594-.585 1.594-1.234h2.437c.253-.267.405-.446.752-.647h-5.102c-.353 0-.638.21-.638.47v4.232c0 .26.285.47.638.47h5.102c-.347-.201-.5-.38-.752-.647M28.176 18.814h2.437c0 .649.714 1.234 1.595 1.234v1.41c-.881 0-1.595.585-1.595 1.234h-2.437c-.252.267-.405.446-.751.647h5.102c.352 0 .637-.21.637-.47v-4.232c0-.26-.285-.47-.637-.47h-5.102c.346.201.499.38.751.647" fill="#0F886E" />
        <path d="M26.15 22.046c0-.333-.233-.695-.68-.707-.542-.015-.636-.243-.652-.345a.95.95 0 0 0 .325-.538c.042 0 .12-.023.126-.19a.435.435 0 0 0-.013-.144c.015-.07.08-.441-.05-.642a.938.938 0 0 0 .133-.195s-.188.132-.438-.023c-.283-.175-.737-.274-1.307.111 0 0-.581-.065-.298.704-.033.021-.047.08-.043.188.008.231.152.188.152.188l.004-.018c.046.2.14.413.33.56-.013.1-.104.333-.651.348-.448.012-.766.37-.766.703h3.827" fill="#0B9D7E" />
      </g>
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, overflow: 'hidden' }}>
    <defs>
      <ellipse id="pa-search-a" cx="9.949" cy="10.202" rx="5.861" ry="5.809" />
      <filter x="-17.8%" y="-11%" width="135.6%" height="123.5%" filterUnits="objectBoundingBox" id="pa-search-c">
        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feColorMatrix values="0 0 0 0 0.439 0 0 0 0 0.463 0 0 0 0 0.455 0 0 0 1 0" in="shadowOffsetOuter1" result="shadowMatrixOuter1" />
        <feMerge><feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <path id="pa-search-d" d="M6.245 13.151h1.704v3.107H6.245z" />
      <path d="M7.063.316c3.726 0 6.747 2.994 6.747 6.688 0 3.693-3.02 6.687-6.747 6.687-3.726 0-6.747-2.994-6.747-6.687C.316 3.31 3.336.316 7.063.316zm0 1.284c-3.011 0-5.452 2.419-5.452 5.404 0 2.984 2.44 5.404 5.452 5.404 3.011 0 5.452-2.42 5.452-5.404 0-2.985-2.44-5.404-5.452-5.404z" id="pa-search-f" />
      <path d="M5.564 15.425v5.43c0 .844.68 1.527 1.533 1.527.847 0 1.533-.692 1.533-1.527v-5.43H5.564z" id="pa-search-h" />
      <path d="M7.063 1.61c3.005 0 5.44 2.415 5.44 5.394 0 2.978-2.435 5.393-5.44 5.393-3.005 0-5.44-2.415-5.44-5.393 0-2.979 2.435-5.393 5.44-5.393zm0 .418c-2.772 0-5.02 2.228-5.02 4.976 0 2.748 2.248 4.975 5.02 4.975 2.772 0 5.02-2.227 5.02-4.975 0-2.748-2.248-4.976-5.02-4.976z" id="pa-search-j" />
      <mask id="pa-search-b" fill="#fff"><use href="#pa-search-a" /></mask>
      <mask id="pa-search-e" fill="#fff"><use href="#pa-search-d" /></mask>
      <mask id="pa-search-g" fill="#fff"><use href="#pa-search-f" /></mask>
      <mask id="pa-search-i" fill="#fff"><use href="#pa-search-h" /></mask>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-1 0)">
        <g opacity="0.634">
          <path d="M23.252 9.99l-1.224-4.515c-.214-.863-.674-1.313-1.556-1.523L15.86 2.755c-.882-.21-1.498-.057-2.14.571l-7.587 7.426a1.596 1.596 0 0 0 0 2.285l6.614 6.474a1.681 1.681 0 0 0 2.335 0l7.587-7.426c.642-.628.798-1.23.584-2.095M17.22 8.658a1.591 1.591 0 0 1 0-2.285c.645-.631 1.69-.631 2.334 0a1.592 1.592 0 0 1 0 2.285c-.644.63-1.69.63-2.334 0" fill="#CCB47F" />
          <path d="M19.555 8.658c-.644.63-1.69.63-2.334 0l-7.782 7.616 3.307 3.237a1.681 1.681 0 0 0 2.335 0l7.587-7.426c.642-.628.798-1.23.584-2.095l-1.224-4.515c-.107-.432-.275-.76-.527-1.007l-1.946 1.905a1.592 1.592 0 0 1 0 2.285" fill="#C1A772" />
          <path fill="#E3E2D5" d="M7.883 12.466l5.447-5.332 5.253 5.142-5.447 5.331-5.253-5.141" />
          <path fill="#D7D6CA" d="M16.054 9.8l-5.447 5.332 2.529 2.475 5.447-5.331-2.53-2.476" />
          <path fill="#A9A9A9" d="M10.412 11.133l4.28 4.19-.778.76-4.28-4.188.778-.762M13.136 10.752l3.112 3.047-.778.761-3.113-3.046.779-.762" />
          <path fill="#999" d="M14.108 11.704l2.14 2.095-.778.762-2.14-2.095.778-.762M12.552 13.228l2.14 2.094-.778.762-2.14-2.095.778-.761" />
        </g>
        <g mask="url(#pa-search-b)">
          <path d="M28.766 6.01L26.903-.884c-.327-1.318-1.027-2.005-2.37-2.326l-7.027-1.828c-1.343-.32-2.282-.087-3.26.873L2.692 7.174a2.441 2.441 0 0 0 0 3.489l10.074 9.885c.978.96 2.578.96 3.556 0L27.877 9.209c.977-.96 1.215-1.88.889-3.199M19.58 3.976a2.434 2.434 0 0 1 0-3.49 2.548 2.548 0 0 1 3.556 0 2.435 2.435 0 0 1 0 3.49 2.548 2.548 0 0 1-3.556 0" fill="#CCB47F" />
          <path d="M19.58 3.976L7.728 15.606l5.037 4.942c.978.96 2.578.96 3.556 0L27.877 9.209c.977-.96 1.215-1.88.889-3.199L26.903-.884c-.163-.66-.42-1.16-.804-1.537L23.136.486a2.435 2.435 0 0 1 0 3.49 2.548 2.548 0 0 1-3.556 0z" fill="#C1A772" />
          <path fill="#E3E2D5" d="M5.358 9.79l8.296-8.14 8 7.85-8.296 8.14-8-7.85" />
          <path fill="#D7D6CA" d="M17.802 5.72L9.506 13.86l3.852 3.78L21.655 9.5l-3.853-3.78" />
          <path fill="#A9A9A9" d="M9.21 7.755l6.518 6.396-1.185 1.164-6.518-6.397L9.21 7.755M13.358 7.174l4.74 4.651-1.185 1.163-4.74-4.652 1.185-1.162" />
          <path fill="#999" d="M14.84 8.627l3.259 3.199-1.185 1.163-3.26-3.199 1.185-1.163M12.469 10.953l3.26 3.198-1.186 1.164-3.26-3.199 1.186-1.163" />
        </g>
        <g filter="url(#pa-search-c)" transform="rotate(-45 12.106 4.92)">
          <use fill="#A3AFAB" href="#pa-search-d" />
          <path fill="#8C9693" mask="url(#pa-search-e)" d="M7.131 13.083h4.157v3.242H7.131z" />
          <use fill="#BEC7C4" href="#pa-search-f" />
          <path fill="#AFB7B5" mask="url(#pa-search-g)" d="M7.131-1.71h10.427v16.55H7.131z" />
          <use fill="#009877" href="#pa-search-h" />
          <path fillOpacity="0.5" fill="#007168" mask="url(#pa-search-i)" d="M7.131 14.839h3.271v8.241H7.131z" />
          <use fill="#424E4E" opacity="0.131" href="#pa-search-j" />
        </g>
      </g>
    </g>
  </svg>
);

const LandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M1 18l6-8 4.5 6h2.525l-3.775-5L14 6l9 12H1z" fill="#787878" />
  </svg>
);

const HouseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 21v-9.375L2.2 13 1 11.4l3-2.3V6h2v1.575L12 3l11 8.4-1.2 1.575-1.8-1.35V21h-7v-6h-2v6H4zM4 5c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 7 2a.968.968 0 0 0 .713-.288A.967.967 0 0 0 8 1h2c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 7 4a.97.97 0 0 0-.713.287A.97.97 0 0 0 6 5H4z" fill="#787878" />
  </svg>
);

const ApartmentsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V7h4V3h10v8h4v10h-8v-4h-2v4H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm4 4h2v-2H9v2zm0-4h2V9H9v2zm0-4h2V5H9v2zm4 8h2v-2h-2v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2zm4 12h2v-2h-2v2zm0-4h2v-2h-2v2z" fill="#787878" />
  </svg>
);

const CommercialIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V7h6V5l3-3 3 3v6h6v10H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V9h-2v2zm0-4h2V5h-2v2zm6 12h2v-2h-2v2zm0-4h2v-2h-2v2z" fill="#787878" />
  </svg>
);

const RoomAnnexIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 21v-2h2V3h10v1h4v15h2v2h-4V6h-2v15H3zm8-8a.968.968 0 0 0 .713-.288A.967.967 0 0 0 12 12a.968.968 0 0 0-.287-.713A.967.967 0 0 0 11 11a.968.968 0 0 0-.712.287A.968.968 0 0 0 10 12c0 .283.096.521.288.713.191.192.429.287.712.287z" fill="#787878" />
  </svg>
);

const HolidayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 21V9l8-6 8 6v12h-3V11H7v10H4zm5-2h6v-2H9v2zm0-4h6v-2H9v2z" fill="#787878" />
  </svg>
);

const subcategories = [
  { label: 'Land For Sale', Icon: LandIcon },
  { label: 'Houses For Sale', Icon: HouseIcon },
  { label: 'Apartments For Sale', Icon: ApartmentsIcon },
  { label: 'Commercial Properties For Sale', Icon: CommercialIcon },
];

const rentSubcategories = [
  { label: 'House Rentals', Icon: HouseIcon },
  { label: 'Apartment Rentals', Icon: ApartmentsIcon },
  { label: 'Commercial Property Rentals', Icon: CommercialIcon },
  { label: 'Room & Annex Rentals', Icon: RoomAnnexIcon },
  { label: 'Holiday & Short-Term Rental', Icon: HolidayIcon },
  { label: 'Land Rentals', Icon: LandIcon },
];

type SubcategoryItem = { label: string; Icon: () => React.ReactNode };

const SubcategoryModal = ({ onClose, onSelect, items, title }: { onClose: () => void; onSelect: (label: string) => void; items: SubcategoryItem[]; title: string }) => (
  <div
    onClick={onClose}
    style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '100%', maxWidth: 480,
        margin: '0 16px',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid rgb(212,222,217)',
      }}>
        <span style={{
          fontFamily: DM, fontSize: 16,
          fontWeight: 800, color: 'rgb(47,52,50)',
        }}>
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, display: 'flex', alignItems: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="rgb(112,118,118)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: '0 20px' }}>
        {items.map(({ label, Icon }, i) => (
          <li
            key={label}
            style={i < items.length - 1 ? { borderBottom: '1px solid rgb(212,222,217)' } : {}}
          >
            <button
              type="button"
              onClick={() => { onSelect(label); onClose(); }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', height: 49,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                  <Icon />
                </span>
                <span style={{
                  fontFamily: DM, fontSize: 14,
                  color: 'rgb(0,116,186)', fontWeight: 400,
                }}>
                  {label}
                </span>
              </div>
              <ChevronRight />
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TableCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div style={{
    flex: '1 1 0%',
    borderRadius: 8,
    border: '1px solid rgb(211,223,255)',
    marginBottom: 16,
    padding: '12px 24px 10px',
    display: 'flex', flexDirection: 'column',
    fontFamily: DM,
  }}>
    <h3 style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0', margin: 0,
      color: 'rgb(66,78,78)', fontFamily: DM,
      fontSize: 16, fontWeight: 600, lineHeight: 'normal',
      borderBottom: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 12, display: 'inline-flex', alignItems: 'center' }}>
          {icon}
        </span>
        {title}
      </div>
    </h3>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {children}
    </ul>
  </div>
);

const CellItem = ({ text, last, onClick }: { text: string; last?: boolean; onClick?: () => void }) => (
  <li style={!last ? { borderBottom: '1px solid rgb(231,237,238)' } : {}}>
    <button type="button" onClick={onClick} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0', width: '100%',
      background: 'none', border: 'none', cursor: 'pointer',
    }}>
      <span style={{ fontFamily: DM, color: 'rgb(0,152,119)', fontSize: 15, fontWeight: 400, textAlign: 'left' }}>
        {text}
      </span>
      <ChevronRight />
    </button>
  </li>
);

export const PostAdPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return <PostAdForm category={selectedCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: DM }}>
      <div style={{ maxWidth: 985, margin: '0 auto', padding: '0 8px 34px' }}>
        <div style={{ padding: 16, marginTop: 40, textAlign: 'center' }}>

          <div style={{ fontSize: 24, fontWeight: 700, fontFamily: DM, color: 'rgb(47,52,50)', marginTop: 16 }}>
            Welcome Guest User!
          </div>
          <div style={{ fontFamily: DM, color: 'rgb(47,52,50)', marginTop: 0 }}>
            What do you want to publish on ikman today?
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 24, gap: 16 }}>
            <TableCard icon={<SellIcon />} title="Sell something">
              <CellItem text="Sell an item, property or service" onClick={() => setShowModal(true)} />
              <CellItem text="Offer a property for rent" last onClick={() => setShowRentModal(true)} />
            </TableCard>

            <TableCard icon={<SearchIcon />} title="Look for something">
              <CellItem text="Look for property to rent" onClick={() => setShowRentModal(true)} />
              <CellItem text="Look for something to buy" last onClick={() => setShowModal(true)} />
            </TableCard>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            marginTop: 30, lineHeight: '24px', fontSize: 15,
          }}>
            <button type="button" style={{
              fontFamily: DM, color: 'rgb(0,152,119)',
              padding: '0 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 15, fontWeight: 400, lineHeight: '24px',
              borderRight: '1px solid rgb(211,223,255)',
            }}>
              Know your posting allowance
            </button>
            <button type="button" style={{
              fontFamily: DM, color: 'rgb(0,152,119)',
              padding: '0 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 15, fontWeight: 400, lineHeight: '24px',
            }}>
              See our posting rules
            </button>
          </div>

        </div>
      </div>

      {showModal && (
        <SubcategoryModal
          title="Select a subcategory"
          items={subcategories}
          onClose={() => setShowModal(false)}
          onSelect={(label) => setSelectedCategory(label)}
        />
      )}
      {showRentModal && (
        <SubcategoryModal
          title="Offer a property for rent"
          items={rentSubcategories}
          onClose={() => setShowRentModal(false)}
          onSelect={(label) => setSelectedCategory(label)}
        />
      )}
    </div>
  );
};
