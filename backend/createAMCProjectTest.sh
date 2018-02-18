projectName=$1
currentLocation=$2

emptyProjectLocation='/home/bill/MC-Projects/ProjectToCopyFrom'

#mkdir $currentLocation/$projectName
cp -a $emptyProjectLocation $currentLocation/$projectName
