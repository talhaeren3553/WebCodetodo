export function formatDate(date: string | number): string {
  try {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Geçersiz tarih';
  }
}

export function formatRelativeDate(date: string | number): string {
  try {
    const now = new Date();
    const targetDate = new Date(date);
    
    if (isNaN(targetDate.getTime())) {
      throw new Error('Invalid date');
    }
    
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Gecikmiş';
    if (diffDays === 0) return 'Bugün';
    if (diffDays === 1) return 'Yarın';
    if (diffDays <= 7) return `${diffDays} gün içinde`;
    return formatDate(date);
  } catch (error) {
    console.error('Error calculating relative date:', error);
    return 'Geçersiz tarih';
  }
}