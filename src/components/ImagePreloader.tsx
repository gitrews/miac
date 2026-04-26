import { useEffect } from 'react'

// Список всех изображений для предзагрузки
const IMAGES_TO_PRELOAD = [
  '/images/manual/step-1.png',
  '/images/manual/step-2.png',
  '/images/manual/step-3.png',
  '/images/manual/step-4.png',
  '/images/manual/step-5.png',
  '/images/manual/step-6.png',
  '/images/manual/step-7.png',
  '/images/screens/step1-mp-1.png',
  '/images/screens/step1-mp-2.png',
  '/images/screens/step1-mp-3.png',
  '/images/screens/step1-mp-4.png',
  '/images/screens/step1-term-1.jpg',
  '/images/screens/step1-term-2.jpg',
  '/images/screens/step1-term-3.jpg',
  '/images/screens/step3-mp-notification.png',
  '/images/screens/step3-mp-waiting.jpg',
  '/images/screens/step3-tv-calling.jpg',
  '/images/step4/page-10.png',
  '/images/step4/page-14.png',
  '/images/step4/page-3.png',
  '/images/step4/page-5.png',
  '/images/step4/page-6.png',
  '/images/step4/page-8.png',
  '/images/widgets/agentCompact.png',
  '/images/widgets/Widget0.png',
  '/images/widgets/WidgetContent1.png',
  '/images/widgets/WidgetContent2.png',
  '/images/widgets/WidgetContent.png',
  '/images/widgets/route-next-room.png',
]

export default function ImagePreloader() {
  useEffect(() => {
    // Предзагружаем изображения с низким приоритетом
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return null
}
