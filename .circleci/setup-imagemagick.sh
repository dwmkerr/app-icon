#!/usr/bin/env bash
set -e

# Remove any installed image magick.
sudo apt remove --purge imagemagick

# Install IM 7.
version="ImageMagick-7.0.8-3"
cp ${version}.tar.gz .
tar xzf ${version}.tar.gz
cd ${version}
touch configure
./configure
make
sudo make install
sudo ldconfig /usr/local/lib
convert -version
cd ..
