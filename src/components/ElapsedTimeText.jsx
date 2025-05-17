"use client";

import React from 'react';

const getElapsedTimeText = (createdDate) => {
  const parsedDate = new Date(createdDate);

  const now = new Date();
  const diffMs = now - parsedDate;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
};

const ElapsedTimeText = ({ createdDate, className = '', style = {} }) => {
  const text = getElapsedTimeText(createdDate);

  if (!text) return null;

  return (
    <p className={className} style={style}>
      {text}
    </p>
  );
};

export default ElapsedTimeText;
