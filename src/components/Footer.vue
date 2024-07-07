<script setup></script>

<template>
    <div id="footer" class="footer-container">
        <div class="footer-title">
            <div class="foorer-title-wrap">
                <div class="title-voenmeh">Военмех</div>
                <div class="title-kafedra-o7">
                    Кафедра <span style="color: #ccc">О</span>7
                </div>
            </div>
        </div>
        <div class="footer-description">
            <div style="margin-top: 66px" class="footer-description-content">
                <img
                    src="../assets/footer/location.svg"
                    alt=""
                    class="footer-description-icon"
                />
                <div class="footer-description-text">
                    Новый корпус 190005, Санкт-Петербург ул. 1-я
                    Красноармейская, д.1 ст. м. Технологический институт
                </div>
            </div>
            <div class="footer-description-content">
                <img
                    src="../assets/footer/planet.svg"
                    alt=""
                    class="footer-description-icon"
                />
                <div class="footer-description-text">
                    https://voenmeh.ru/education/faculties-and-departments/faco/kaf-o7
                </div>
            </div>
            <div class="footer-description-content">
                <img
                    src="../assets/footer/mail.svg"
                    alt=""
                    class="footer-description-icon"
                />
                <div class="footer-description-text">kaf_o7@voenmeh.ru</div>
            </div>
            <div class="footer-description-content">
                <img
                    src="../assets/footer/phone.svg"
                    alt=""
                    class="footer-description-icon"
                />
                <div class="footer-description-text">+7 (812) 490-05-51</div>
            </div>
        </div>
        <div class="footer-reference">
            <div class="footer-reference-wrap">
                <div class="footer-reference-title">Социальные сети:</div>
                <div class="footer-ref-a">
                    <a href="" class="footer-reference-ref vk"></a>
                    <a href="" class="footer-reference-ref discord"></a>
                    <a
                        style="margin-right: 78px"
                        href=""
                        class="footer-reference-ref email"
                    ></a>
                </div>
            </div>
        </div>
        <div class="footer-back"></div>
    </div>
</template>

<style>
@font-face {
    font-family: JetBrainsMono;
    src: url('../assets/JetBrainsMono.ttf');
}
.footer-description-text {
    width: 634px;
    margin-left: 24px;
}
.footer-description-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
    margin-top: 46px;
}
.footer-description-text {
    font-weight: 300;
    font-size: 16px;
}
.footer-description {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
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
.footer-ref-a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.footer-reference-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 100%;
}
.footer-reference-title {
    margin-left: 16px;
}
.footer-reference-ref {
    width: 40px;
    height: 40px;
    margin-right: 40px;
}
.foorer-title-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.title-kafedra-o7 {
    font-family: JetBrainsMono;
    font-size: 30px;
    color: #1e66f5;
    font-weight: 700;
    margin-right: 54px;
}
.title-voenmeh {
    font-family: JetBrainsMono;
    font-size: 30px;
    color: #ccc;
    font-weight: 700;
    margin-left: 18px;
}
.footer-container {
    width: 100%;
    height: 429px;
    font-family: JetBrainsMono;
    color: #cccccc;
    font-size: 30px;
    margin-top: 150px;
    /* background-color: #0d101f; */
}
.footer-back {
    width: 100%;
    height: 202px;
    background-color: #181818;
    border: 1px solid white;
    border-right: none;
    border-left: none;
    position: absolute;
    bottom: 40px;
    z-index: 0;
}
.footer-title {
    width: 566px;
    height: 75px;
    background-color: #191919;
    border: 1px solid #1e66f5;
    position: absolute;
    z-index: 3;
    bottom: 430px;
    left: 100px;
}
.footer-description {
    position: absolute;
    border-top-right-radius: 115px;
    width: 1275px;
    height: 352px;
    border-right: 1px solid white;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    z-index: 2;
    background-color: #1f1f1f;
}
.footer-reference {
    position: absolute;
    width: 672px;
    height: 75px;
    background-color: #191919;
    border: 1px solid #1e66f5;
    z-index: 3;
    bottom: 70px;
    left: 800px;
}
</style>
