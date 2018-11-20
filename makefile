# Run the CircleCI build locally.
circleci:
	circleci config validate -c .circleci/config.yml
	circleci build --job test
