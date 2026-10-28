export const categories = [
  { key: 'პარკები და მოედნები', emoji: '🌳', title: { ka: 'პარკები და მოედნები', en: 'Parks & playgrounds' }, text: { ka: 'ირბინე, ცოცე, აღმოაჩინე', en: 'Run, climb, explore' } },
  { key: 'დახურული თამაში', emoji: '🧸', title: { ka: 'დახურული თამაში', en: 'Indoor play' }, text: { ka: 'გართობა ნებისმიერ ამინდში', en: 'Fun in any weather' } },
  { key: 'თეატრი და კულტურა', emoji: '🎭', title: { ka: 'თეატრი და კულტურა', en: 'Theatre & culture' }, text: { ka: 'ისტორიები ცოცხლდება', en: 'Stories come alive' } },
  { key: 'ცხოველები და შემეცნება', emoji: '🐠', title: { ka: 'ცხოველები და შემეცნება', en: 'Animals & discovery' }, text: { ka: 'გაიცანი საინტერესო სამყარო', en: 'Meet an amazing world' } },
  { key: 'შემოქმედებითი სახელოსნოები', emoji: '🎨', title: { ka: 'შემოქმედებითი სახელოსნოები', en: 'Creative workshops' }, text: { ka: 'შექმენი რამე საოცარი', en: 'Make something amazing' } },
  { key: 'ზღვა და ბუნება', emoji: '🏖️', title: { ka: 'ზღვა და ბუნება', en: 'Sea & nature' }, text: { ka: 'პატარა სანაპირო თავგადასავლები', en: 'Little seaside adventures' } },
  { key: 'ღონისძიებები', emoji: '🎟️', title: { ka: 'შოუები და ღონისძიებები', en: 'Shows & events' }, text: { ka: 'რა ხდება ოჯახებისთვის', en: 'What\'s on for families' } },
]

export const filters = [
  { key: 'All', label: { ka: 'ყველა ადგილი', en: 'All places' } },
  { key: 'პარკები და მოედნები', label: { ka: '🌳 პარკები და მოედნები', en: '🌳 Parks & playgrounds' } },
  { key: 'დახურული თამაში', label: { ka: '🧸 დახურული გართობა', en: '🧸 Indoor fun' } },
  { key: 'თეატრი და კულტურა', label: { ka: '🎭 თეატრი და კულტურა', en: '🎭 Theatre & culture' } },
  { key: 'ცხოველები და შემეცნება', label: { ka: '🐠 ცხოველები', en: '🐠 Animals' } },
  { key: 'შემოქმედებითი სახელოსნოები', label: { ka: '🎨 სახელოსნოები', en: '🎨 Workshops' } },
  { key: 'ზღვა და ბუნება', label: { ka: '🏖️ ზღვა და ბუნება', en: '🏖️ Sea & nature' } },
  { key: 'ღონისძიებები', label: { ka: '🎟️ შოუები და ღონისძიებები', en: '🎟️ Shows & events' } },
  { key: 'Near', label: { ka: '⌖ ჩემთან ახლოს', en: '⌖ Near me' } },
]

export const ageOptions = [
  { key: 'Any', label: { ka: 'ყველა ასაკი', en: 'All ages' } },
  { key: '0-2', label: { ka: '0–2 წელი', en: '0–2 years' } },
  { key: '3-6', label: { ka: '3–6 წელი', en: '3–6 years' } },
  { key: '7-12', label: { ka: '7–12 წელი', en: '7–12 years' } },
  { key: '13+', label: { ka: '13+ წელი', en: '13+ years' } },
]

export const spaceOptions = [
  { key: 'Any', label: { ka: 'ღია და დახურული', en: 'Indoor & outdoor' } },
  { key: 'indoor', label: { ka: 'დახურული სივრცე', en: 'Indoor' } },
  { key: 'outdoor', label: { ka: 'ღია ცის ქვეშ', en: 'Outdoor' } },
]

export const priceOptions = [
  { key: 'Any', label: { ka: 'ნებისმიერი ფასი', en: 'Any price' } },
  { key: 'Free', label: { ka: 'უფასო', en: 'Free' } },
  { key: 'Paid', label: { ka: 'ფასიანი', en: 'Paid' } },
]

export function categoryTitle(key, lang) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].key === key) {
      return categories[i].title[lang]
    }
  }
  return key
}
