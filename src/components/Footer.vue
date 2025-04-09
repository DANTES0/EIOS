<script setup>
// Можно добавить нужные импорты или логику
</script>

<template>
    <footer id="footer" class="footer">
        <!-- Верхняя часть футера -->
        <div class="footer-top-wrapper">
            <div class="footer-top bg-white dark:bg-[#1f1f1f]">
                <div class="footer-title">
                    <span class="title-voenmeh text-[#0c2340] dark:text-white"
                        >БГТУ "ВОЕНМЕХ"</span
                    >
                    <span class="title-kafedra-o7 text-[#0c2340] dark:text-white"
                        >Кафедра O7</span
                    >
                </div>
            </div>
        </div>

        <!-- Основное содержимое -->
        <div class="footer-main bg-[#0C2340] dark:bg-[#181818]">
            <div class="footer-content">
                <!-- Контактная информация -->
                <div class="footer-contacts">
                    <div class="contact-item">
                        <img
                            src="../assets/footer/location.svg"
                            alt="Адрес"
                            class="contact-icon"
                        />
                        <a
                            href="https://yandex.ru/maps/?text=Новый корпус 190005, Санкт-Петербург ул. 1-я Красноармейская, д.1"
                            target="_blank"
                            class="contact-link"
                        >
                            Новый корпус 190005, Санкт-Петербург ул. 1-я Красноармейская,
                            д.1
                        </a>
                    </div>

                    <div class="contact-item">
                        <img
                            src="../assets/footer/planet.svg"
                            alt="Сайт"
                            class="contact-icon"
                        />
                        <a
                            href="https://voenmeh.ru/education/faculties-and-departments/faco/kaf-o7"
                            class="contact-link"
                        >
                            voenmeh.ru/education/faculties-and-departments/faco/kaf-o7
                        </a>
                    </div>

                    <div class="contact-item">
                        <img
                            src="../assets/footer/mail.svg"
                            alt="Почта"
                            class="contact-icon"
                        />
                        <a href="mailto:kaf_o7@voenmeh.ru" class="contact-link"
                            >kaf_o7@voenmeh.ru</a
                        >
                    </div>

                    <div class="contact-item">
                        <img
                            src="../assets/footer/phone.svg"
                            alt="Телефон"
                            class="contact-icon"
                        />
                        <a href="tel:+78124900551" class="contact-link"
                            >+7 (812) 490-05-51</a
                        >
                    </div>
                </div>

                <!-- Социальные сети -->
                <div class="footer-social bg-white dark:bg-[#1f1f1f]">
                    <span class="social-title text-[#0C2340] dark:text-white">
                        Социальные сети
                    </span>
                    <div class="social-links">
                        <a href="#" class="social-link vk"></a>
                        <a href="#" class="social-link discord"></a>
                        <a href="#" class="social-link email"></a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Декоративный элемент -->
        <div class="footer-decoration"></div>
    </footer>
</template>

<style scoped>
/* Базовые стили */
.footer {
    width: 100%;
    position: relative;
    margin-top: 80px;
    font-family: 'JetBrainsMono', monospace;
    --footer-content-max-width: 1100px;
}

/* Верхняя часть с 
названиями */
.footer-top-wrapper {
    display: block;
    margin: 0 auto;
    max-width: var(--footer-content-max-width);
}
.footer-top {
    top: 40px;
    padding: 20px;
    display: flex;
    justify-content: center;
    border: 1px solid #1e66f5;
    border-top: 1px solid #1e66f5;
    border-right: 1px solid #1e66f5;
    border-radius: 10px;
    position: relative;
    z-index: 2;
    max-width: 500px;
    /* margin: 0 auto; */
}

.footer-title {
    display: flex;
    gap: 14px;
    align-items: center;
}

.title-voenmeh,
.title-kafedra-o7 {
    font-size: 24px;
    font-weight: 700;
}

/* Основное содержимое */
.footer-main {
    padding: 80px 20px 40px;
    position: relative;
    z-index: 1;
    /* border-top-right-radius: 115px; */
    /* border-right: 1px solid white; */
    border-top: 1px solid white;
}

/* Контакты */
.footer-contacts {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    min-width: 300px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.contact-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.contact-link {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 300;
    transition: color 0.3s;
}

.contact-link:hover {
    color: #1e66f5;
}

/* Социальные сети */
.footer-social {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 30px;
    border: 1px solid #1e66f5;
    min-width: 300px;
    max-height: 70px;
}

.social-title {
    font-weight: 700;
    font-size: 16px;
}

.social-links {
    display: flex;
    gap: 20px;
}

.social-link {
    width: 40px;
    height: 40px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.3s;
}

.social-link:hover {
    transform: scale(1.1);
}

.vk {
    background-image: url('../assets/footer/vk.svg');
}

.discord {
    background-image: url('../assets/footer/discord.svg');
}

.email {
    background-image: url('../assets/footer/email.svg');
}

/* Декоративный элемент */
.footer-decoration {
    /* height: 150px; */
    /* border-top: 1px solid white; */
    position: relative;
    z-index: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        gap: 30px;
    }

    .footer-top {
        max-width: 90%;
    }

    .footer-title {
        flex-direction: column;
        gap: 8px;
        text-align: center;
    }

    .title-voenmeh,
    .title-kafedra-o7 {
        font-size: 20px;
    }

    .footer-main {
        /* border-top-right-radius: 60px; */
        padding: 80px 20px;
    }

    .footer-social {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .social-links {
        width: 100%;
        justify-content: space-between;
    }
}

@media (max-width: 480px) {
    .contact-link {
        font-size: 14px;
    }

    .footer-main {
        /* border-top-right-radius: 40px; */
    }

    .footer-decoration {
        /* height: 100px; */
    }
}

.footer-content {
    max-width: var(--footer-content-max-width);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
    align-items: center; /* Добавляем выравнивание по центру по вертикали */
}

.footer-social {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 30px;
    border: 1px solid #1e66f5;
    border-radius: 10px;
    min-width: 300px;
    height: 100%; /* Занимает всю доступную высоту */
    box-sizing: border-box; /* Учитываем padding в высоте */
}
</style>
