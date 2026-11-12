package com.zosh.zosh_social_youtube.configuration;

import com.zosh.zosh_social_youtube.enums.EnumRole;
import com.zosh.zosh_social_youtube.enums.Gender;
import com.zosh.zosh_social_youtube.entity.User;
import com.zosh.zosh_social_youtube.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    private static final String ADMIN_PASSWORD_PLACEHOLDER =
            "PASTE_A_STRONG_INITIAL_ADMIN_PASSWORD_HERE";

    PasswordEncoder passwordEncoder;
//    RoleRepository roleRepository;
    UserRepository userRepository;

    @Bean
    @Transactional // Đảm bảo tất cả thay đổi DB thực hiện trong một transaction
    ApplicationRunner applicationRunner(
            @Value("${app.bootstrap-admin.password:}") String bootstrapAdminPassword) {
        return args -> {
            // ✅ Kiểm tra và tạo Role ADMIN nếu chưa có
//            Role adminRole = roleRepository.findById(EnumRole.ADMIN.name())
//                    .orElseGet(() -> {
//                        Role newRole = new Role(EnumRole.ADMIN.name(), "Administrator role", new HashSet<>(), new HashSet<>());
//                        return roleRepository.save(newRole);
//                    });

//            Role adminRole = roleRepository.findByName(EnumRole.ADMIN.name())
//                    .orElseGet(() -> {
//                        Role newRole = Role.builder()
//                                .name(EnumRole.ADMIN.name())
//                                .description("Administrator role")
//                                .permissions(new HashSet<>())
//                                .users(new HashSet<>())
//                                .build();
//                        return roleRepository.save(newRole);
//                    });

            // ✅ Kiểm tra và tạo user "admin" nếu chưa tồn tại
            Optional<User> existingAdmin = userRepository.findByUsername("admin");
            boolean hasConfiguredAdminPassword = bootstrapAdminPassword != null
                    && !bootstrapAdminPassword.isBlank()
                    && !bootstrapAdminPassword.startsWith("PASTE_")
                    && !bootstrapAdminPassword.startsWith("replace-with");

            if (existingAdmin.isEmpty()) {
                if (!hasConfiguredAdminPassword) {
                    log.warn("Admin bootstrap skipped. Set BOOTSTRAP_ADMIN_PASSWORD to create the initial admin user");
                    return;
                }

                var roles = new HashSet<String>();
                roles.add(EnumRole.ADMIN.name());

                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode(bootstrapAdminPassword))
                        .email("admin@example.com")
                        .firstName("Admin")
                        .lastName("User")
                        .dob(LocalDate.of(2000, 1, 1))
                        .gender(Gender.MALE) // Cập nhật lại kiểu dữ liệu gender// Gán role ngay khi tạo
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.info("Initial admin user has been created");
            } else if (hasConfiguredAdminPassword
                    && passwordEncoder.matches(
                            ADMIN_PASSWORD_PLACEHOLDER, existingAdmin.get().getPassword())) {
                User admin = existingAdmin.get();
                admin.setPassword(passwordEncoder.encode(bootstrapAdminPassword));
                userRepository.save(admin);
                log.info("Replaced the placeholder password on the initial admin user");
            }
        };
    }
}
