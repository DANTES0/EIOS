<template>
    <div class="terminal-tabs" :class="{'expanded': isExpanded}">
        <div class="termainal-tabs-wrapper bg-[#0C2340] dark:bg-[#1f1f1f]">
            <div class="title-terminal text-white dark:text-[#9ea6b1]" :style="titleStyle">ТЕРМИНАЛ</div>
            <div class="arrow-terminal-up" :class="{'rotated': isExpanded}" @click="toggleExpand" />
            <div v-if="isExpanded" class="terminal-output-wrapper" ref="outputWrapper">
                <div v-html="outputText"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const isExpanded = ref(false);
const outputText = ref('');
const logs = [
    ' __      ______  ______ _   _ __  __ ______ _    _    ____ ______ \n' +
    ' \\ \\    / / __ \\|  ____| \\ | |  \\/  |  ____| |  | |  / __ \\____  | \n' +
    '  \\ \\  / / |  | | |__  |  \\| | \\  / | |__  | |__| | | |  | |  / / \n' +
    '   \\ \\/ /| |  | |  __| | . ` | |\\/| |  __| |  __  | | |  | | / /  \n' +
    '    \\  / | |__| | |____| |\\  | |  | | |____| |  | | | |__| |/ /   \n' +
    '     \\/   \\____/|______|_| \\_|_|  |_|______|_|  |_|  \\____//_/    \n' +
    '                                                                   \n' +
    ' :: Spring Boot ::                (v3.2.3)\n',
    '2025-04-07T21:44:49.315+03:00  INFO 36696 --- [Security-jwt] [main] r.k.s.S.SecurityJwtApplication           : Starting SecurityJwtApplication using Java 23.0.2 with PID 36696 (C:\\Users\\odent\\IdeaProjects\\Security-jwt\\target\\classes started by odent in C:\\Users\\odent\\IdeaProjects\\Security-jwt)\n',
    '2025-04-07T21:44:49.317+03:00  INFO 36696 --- [Security-jwt] [main] r.k.s.S.SecurityJwtApplication           : No active profile set, falling back to 1 default profile: "default"\n',
    '2025-04-07T21:44:49.698+03:00  WARN 36696 --- [Security-jwt] [main] o.s.boot.actuate.endpoint.EndpointId     : Endpoint ID \'http.server.requests\' contains invalid characters, please migrate to a valid format.\n',
    '2025-04-07T21:44:50.034+03:00  INFO 36696 --- [Security-jwt] [main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.\n',
    '2025-04-07T21:44:50.095+03:00  INFO 36696 --- [Security-jwt] [main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 56 ms. Found 10 JPA repository interfaces.\n',
    '2025-04-07T21:44:50.590+03:00  INFO 36696 --- [Security-jwt] [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)\n',
    '2025-04-07T21:44:50.597+03:00  INFO 36696 --- [Security-jwt] [main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]\n',
    '2025-04-07T21:44:50.597+03:00  INFO 36696 --- [Security-jwt] [main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.19]\n',
    '2025-04-07T21:44:50.640+03:00  INFO 36696 --- [Security-jwt] [main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext\n',
    '2025-04-07T21:44:50.640+03:00  INFO 36696 --- [Security-jwt] [main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1291 ms\n',
    '2025-04-07T21:44:50.769+03:00 DEBUG 36696 --- [Security-jwt] [main] o.s.w.f.ServerHttpObservationFilter      : Filter \'webMvcObservationFilter\' configured for use\n',
    '2025-04-07T21:44:50.806+03:00  INFO 36696 --- [Security-jwt] [main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...\n',
    '2025-04-07T21:44:53.176+03:00  INFO 36696 --- [Security-jwt] [main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@*****\n',
    '2025-04-07T21:44:53.177+03:00  INFO 36696 --- [Security-jwt] [main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.\n',
    '2025-04-07T21:44:53.242+03:00  INFO 36696 --- [Security-jwt] [main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]\n',
    '2025-04-07T21:44:53.283+03:00  INFO 36696 --- [Security-jwt] [main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.4.4.Final\n',
    '2025-04-07T21:44:53.305+03:00  INFO 36696 --- [Security-jwt] [main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled\n',
    '2025-04-07T21:44:53.448+03:00  INFO 36696 --- [Security-jwt] [main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer\n',
    '2025-04-07T21:44:53.672+03:00  WARN 36696 --- [Security-jwt] [main] org.hibernate.orm.deprecation            : HHH90000025: PostgreSQLDialect does not need to be specified explicitly using \'hibernate.dialect\' (remove the property setting and it will be selected by default)\n',
    '2025-04-07T21:44:54.634+03:00  INFO 36696 --- [Security-jwt] [main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set \'hibernate.transaction.jta.platform\' to enable JTA platform integration)\n',
    '2025-04-07T21:44:54.636+03:00  INFO 36696 --- [Security-jwt] [main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit \'default\'\n',
    '2025-04-07T21:44:55.173+03:00  WARN 36696 --- [Security-jwt] [main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning\n',
    '2025-04-07T21:44:55.322+03:00 DEBUG 36696 --- [Security-jwt] [main] s.w.s.m.m.a.RequestMappingHandlerMapping : 57 mappings in \'requestMappingHandlerMapping\'\n',
    '2025-04-07T21:44:55.622+03:00 DEBUG 36696 --- [Security-jwt] [main] o.s.w.s.handler.SimpleUrlHandlerMapping  : Patterns [/webjars/**, /**, /swagger-ui*/*swagger-initializer.js, /swagger-ui*/**] in \'resourceHandlerMapping\'\n',
    '2025-04-07T21:44:55.718+03:00  INFO 36696 --- [Security-jwt] [main] o.s.b.a.e.web.EndpointLinksResolver      : Exposing 3 endpoint(s) beneath base path \'/actuator\'\n',
    '2025-04-07T21:44:55.765+03:00  INFO 36696 --- [Security-jwt] [main] o.s.s.web.DefaultSecurityFilterChain     : Will secure any request with [org.springframework.security.web.session.DisableEncodeUrlFilter@***** , org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter@***** , org.springframework.security.web.context.SecurityContextHolderFilter@***** , org.springframework.security.web.header.HeaderWriterFilter@***** , org.springframework.web.filter.CorsFilter@***** , org.springframework.security.web.authentication.logout.LogoutFilter@***** , ru.kafedra.spring.Securityjwt.JWT.JwtFilter@***** , org.springframework.security.web.savedrequest.RequestCacheAwareFilter@***** , org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter@***** , org.springframework.security.web.authentication.AnonymousAuthenticationFilter@***** , org.springframework.security.web.session.SessionManagementFilter@***** , org.springframework.security.web.access.ExceptionTranslationFilter@***** , org.springframework.security.web.access.intercept.AuthorizationFilter@***** ]\n',
    '2025-04-07T21:44:55.840+03:00 DEBUG 36696 --- [Security-jwt] [main] s.w.s.m.m.a.RequestMappingHandlerAdapter : ControllerAdvice beans: 0 @ModelAttribute, 0 @InitBinder, 1 RequestBodyAdvice, 1 ResponseBodyAdvice\n',
    '2025-04-07T21:44:55.866+03:00 DEBUG 36696 --- [Security-jwt] [main] o.s.web.servlet.DispatcherServlet        : DispatcherServlet with name \'dispatcherServlet\' processing \'GET\' request for \'/swagger-ui.html\'\n',
    '2025-04-07T21:44:56.032+03:00 DEBUG 36696 --- [Security-jwt] [main] o.s.web.servlet.DispatcherServlet        : DispatcherServlet with name \'dispatcherServlet\' completed 200 OK, response in 166 ms\n',
    '2025-04-07T21:44:56.069+03:00 DEBUG 36696 --- [Security-jwt] [main] o.s.w.f.ServerHttpObservationFilter      : Filter \'webMvcObservationFilter\' configured for use\n'
];

let currentIndex = 0;

// Флаг, указывающий, что анимация уже запущена
const isAnimationRunning = ref(false);

// Получаем доступ к ссылке на элемент
const outputWrapper = ref(null);

// Функция для переключения раскрытия
const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
    if (isExpanded.value && !isAnimationRunning.value) {
        startConsoleOutput(); // Запускаем вывод только если анимация не была начата
    }
};

// Анимация вывода
const startConsoleOutput = () => {
    outputText.value = '';
    currentIndex = 0;
    isAnimationRunning.value = true; // Устанавливаем флаг, что анимация началась

    const interval = setInterval(() => {
        if (currentIndex < logs.length) {
            outputText.value += logs[currentIndex].replace(/Security-jwt/gi, 'YourApp'); // Заменяем sensitive данные
            currentIndex++;
            scrollToBottom();
        } else {
            clearInterval(interval); // Останавливаем анимацию после окончания вывода
            isAnimationRunning.value = false; // Снимаем флаг, что анимация завершена
        }
    }, 2000); // Интервал между строками
};

// Прокрутка вниз, когда новый текст добавляется
watch(outputText, () => {
    nextTick(() => {
        const outputDiv = document.querySelector('.terminal-output-wrapper div');
        if (outputDiv) {
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    });
});

// Стили для перемещения текста в верхнюю часть при раскрытии
const titleStyle = computed(() => ({
    transform: isExpanded.value ? 'translateY(0)' : 'translateY(50%)',
    transition: 'transform 0.3s ease',
}));

onMounted(() => {
    if (isExpanded.value && !isAnimationRunning.value) {
        startConsoleOutput(); // Если уже раскрыта, начинаем вывод сразу
    }
});
</script>

<style scoped>
.termainal-tabs-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    overflow: hidden;
}

.title-terminal {
    font-family: JetBrainsMono;
    font-weight: 700;
    font-size: 26px;
    margin-left: 15px;
    color: #ffffff;
    top: 0;
    left: 15px;
    z-index: 2;
    transition: transform 0.3s ease;
}

.arrow-terminal-up {
    background-image: url('../assets/Upper.svg');
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    transition: transform 0.3s ease;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100; /* Убедитесь, что стрелка находится поверх других элементов */
}

.arrow-terminal-up:hover {
    filter: brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(3534%) hue-rotate(146deg) brightness(122%) contrast(120%);
}

.arrow-terminal-up.rotated {
    transform: rotate(180deg);
}

.terminal-tabs {
    width: 100%;
    height: 40px; /* Это начальная высота */
    border-top: 1px solid white;
    position: sticky;
    bottom: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    transition: height 0.3s ease; /* Плавное изменение высоты */
}

.terminal-tabs.expanded {
    height: 300px; /* Или любая максимальная высота */

}

.terminal-output-wrapper {
    color: #ffffff;
    font-family: 'JetBrainsMono', monospace;
    padding: 15px;
    width: 100%;
    max-height: 300px;
    white-space: pre-wrap;
    overflow-x: hidden;
    overflow-y: hidden;
    animation: fadeIn 1s ease-in-out;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.terminal-output-wrapper div {
    white-space: pre-wrap; /* Сохраняем переносы строк */
    overflow-y: hidden; /* Добавляем вертикальную прокрутку */
    overflow-x: hidden; /* Скрываем горизонтальную прокрутку */
    max-height: 300px; /* Ограничиваем высоту */
    font-size: 15px;
}

.terminal-tabs.expanded .terminal-output-wrapper {
    opacity: 1;
    max-height: 300px;
}

/* Плавное появление */
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
