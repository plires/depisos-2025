# Local development image: Apache + PHP (mirrors the cPanel/.htaccess setup used in production).
# Switch PHP version with PHP_VERSION=8.3 in the shell or in .env.
ARG PHP_VERSION=8.4

FROM axllent/mailpit:latest AS mailpit
FROM composer:2 AS composer

FROM php:${PHP_VERSION}-apache

RUN apt-get update \
  && apt-get install -y --no-install-recommends git unzip \
  && rm -rf /var/lib/apt/lists/* \
  && docker-php-ext-install pdo_mysql \
  && a2enmod rewrite headers

# Mailpit's sendmail mode relays PHP mail() / PHPMailer::isSendmail() to the mailpit service.
COPY --from=mailpit /mailpit /usr/local/bin/mailpit
COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY php.ini /usr/local/etc/php/conf.d/zz-depisos.ini
COPY apache.conf /etc/apache2/conf-available/depisos.conf
RUN a2enconf depisos

WORKDIR /var/www/html
