if [ ! -z $1 ]; then 
	# If arg1 exist use it
	NODE_ENVIRONMENT=test mocha --grep $1 --recursive tests/ 
else
	NODE_ENVIRONMENT=test mocha --recursive tests/ 
fi