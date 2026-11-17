text:
	{ \
        find config -name "*.yaml" -print0 ; \
        find src -name "*.php" -print0 ; \
        find templates -name "*.twig" -print0 ; \
        find tests -name "*.php" -print0 ; \
        printf '%s\0' public/js/admin.js public/js/block.js public/js/link.js public/js/jwt-exit.js public/js/jwt-fetch.js public/js/private.js public/js/public.js docker/php/Dockerfile docker-compose.yml ; \
    } | xargs -0 -I {} sh -c 'echo "=== {} ===" && cat "{}" && echo ""' > /home/max/www/aftaa.ru-code.txt
