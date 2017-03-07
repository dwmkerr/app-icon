# Set the default parameters for the build, can be overridden with either an
# environment variable or by using `make target KEY=VALUE`.
VERSION ?= $(shell cat package.json | jq --raw-output .version)
BUILD_NUM ?= 0

# Touch will ensure that all version numbers are consistent, based on the
# package.json version.
touch:
  # Set the version and build number in the config file.
	$(info "Touching to version $(VERSION) and build number $(BUILD_NUM).")
	sed -i "" -e 's/android-versionCode=\"[0-9]*\"/android-versionCode=\"$(BUILD_NUM)\"/g' ./config.xml
	sed -i "" -e 's/ios-CFBundleVersion=\"[0-9]*\"/ios-CFBundleVersion=\"$(BUILD_NUM)\"/g' ./config.xml
	sed -i "" -e 's/version=\"[.0-9a-zA-Z]*\"/version=\"$(VERSION)"/g' ./config.xml

# Tests the code.
test:
	$(warning No tests so far, do not forget to add some in the future.)
	@echo 0

# Creates the Android APK.
build-android:
ifndef IA_KEYSTORE_PASSWORD
	$(error No IA_KEYSTORE_PASSWORD is set, cannot build APK.)
endif
	# Recreate the Android platform.
	rm -rf ./platforms/android
	cordova platform add android
	npm run ionic:build
	cordova build android --release
	cp platforms/android/build/outputs/apk/*.apk ./artifacts/ionic_app.apk
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
		-keystore ./build/ionic_app.keystore \
		-storepass $(IA_KEYSTORE_PASSWORD) -keypass $(IA_KEYSTORE_PASSWORD) \
			"./artifacts/ionic_app.apk" ionic_app

deploy-android: touch build-android
ifndef IA_HOCKEYAPP_TOKEN
	$(error No IA_HOCKEYAPP_TOKEN is set, cannot deploy to HockeyApp.)
endif
	curl https://rink.hockeyapp.net/api/2/apps/upload \
    -F "status=2" \
    -F "notify=1" \
	-F "bundle_short_version=$(VERSION)" \
	-F "bundle_version=$(BUILD_NUM)" \
    -F "ipa=@./artifacts/ionic_app.apk" \
    -H "X-HockeyAppToken: $(IA_HOCKEYAPP_TOKEN)"

# Creates the iOS IPA.
build-ios:
ifndef IA_TEAM_ID
	$(error No IA_TEAM_ID is set, cannot build IPA.)
endif
	# Recreate the iOS platform.
	rm -rf ./platforms/ios
	cordova platform add ios
	npm run ionic:build
	cordova prepare ios --release
	sed -i '' 's/ProvisioningStyle = Automatic;/ProvisioningStyle = Manual;/' platforms/ios/ionic_app.xcodeproj/project.pbxproj
	cd ./platforms/ios; \
		cordova build ios --device \
    	--codeSignIdentity="iPhone Developer" \
    	--developmentTeam="$(IA_TEAM_ID)" \
    	--packageType="development"; \
	cd ../..;
	cp platforms/ios/build/device/*.ipa ./artifacts/ionic_app.ipa

deploy-ios: touch build-ios
ifndef IA_HOCKEYAPP_TOKEN
	$(error No IA_HOCKEYAPP_TOKEN is set, cannot deploy to HockeyApp.)
endif
	curl https://rink.hockeyapp.net/api/2/apps/upload \
    -F "status=2" \
    -F "notify=1" \
	-F "bundle_short_version=$(VERSION)" \
	-F "bundle_version=$(BUILD_NUM)" \
    -F "ipa=@./artifacts/ionic_app.ipa" \
    -H "X-HockeyAppToken: $(IA_HOCKEYAPP_TOKEN)"

deploy: deploy-android deploy-ios
