#/bin/bash
#upload files
aws s3 cp ../dist s3://cloud.sequencealignmentvisualizer.com --recursive --acl public-read