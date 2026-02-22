export function getCategoryIcon(category) {
  const icons = {
    food: '🍽️',
    housing: '🏠',
    healthcare: '🏥',
    employment: '💼',
    youth: '👨‍👩‍👧‍👦',
    crisis: '🚨',
  };
  return icons[category] || '📋';
}
