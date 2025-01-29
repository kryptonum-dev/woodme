export const getOpenHours = (data: { from: string; to: string; closeWeekends: boolean }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return minutes === 0 ? `${hours}` : `${hours}:${minutes}`;
  };

  return {
    days: data.closeWeekends ? 'Pon.-Pt.' : 'Codziennie',
    time: `${formatTime(data.from)} - ${formatTime(data.to)}`,
  };
};
