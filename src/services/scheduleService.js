import config from '../config';

const timeSlots = ['09:00', '10:50', '12:40', '14:55', '16:45', '18:30', '20:05'];
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const fetchSchedule = async (selectedOption) => {
    const params = new URLSearchParams({
        pageSize: 999,
        pageNumber: 0,
        [selectedOption.includes('teacher') ? 'teacherId' : 'groupId']:
            selectedOption.replace('teacher', ''),
    });

    const scheduleUrl = `${config.ServerURL}/api/v1/schedule?${params}`;

    try {
        const response = await fetch(scheduleUrl);
        const result = await response.json();

        const scheduleData = result.data || [];
        const scheduleGrid = Array.from({ length: 14 }, () => Array(6).fill(null));

        scheduleData.forEach((entry) => {
            const parsedTime = entry.timeStart.split('T')[1].slice(0, 5);
            const timeIndex = timeSlots.indexOf(parsedTime);
            const dayIndex = days.indexOf(entry.dayOfWeek);
            const weekOffset = entry.parityOfWeek === 'четная' ? 1 : 0;
            const gridIndex = timeIndex * 2 + weekOffset;

            if (timeIndex !== -1 && dayIndex !== -1) {
                if (gridIndex < scheduleGrid.length) {
                    scheduleGrid[gridIndex][dayIndex] = entry;
                } else {
                    console.error(
                        `Ошибка: gridIndex (${gridIndex}) выходит за пределы массива!`,
                    );
                }
            } else {
                console.warn('Некорректные данные:', entry);
            }
        });

        return scheduleGrid;
    } catch (error) {
        console.error('Ошибка при загрузке расписания:', error);

        return [];
    }
};

//мне приходит цифра с сервера
//мне нужно рисовать как чётную так и нечётную недели
//при выводе недели проверять значение цифры с сервера
//если цифра с сервера совпадает с неделей,которую компонент рисует сейчас
//то добавлять ячейке предмета класс current с background-color: gray;
//true - чётная
//false - нечётная

const currentWeekIsEven = async () => {
    const scheduleCheckURL = `${config.ServerURL}/api/v1/schedule/check`;

    try {
        const response = await fetch(scheduleCheckURL);
        const result = await response.json();

        return result; // true (четная) или false (нечетная)
    } catch (error) {
        console.error('Ошибка при проверке недели:', error);

        return null;
    }
};

export { fetchSchedule, currentWeekIsEven, timeSlots, days };
