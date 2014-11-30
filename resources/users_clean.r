users <- read.csv("users.csv")

#1 - male
#2 - female
users$GENDER <- factor(c(users$GENDER),labels = c("2","1"))

#Factoring working column
users$WORKING <- factor(c(users$WORKING))

#Factoring region column
users$REGION <- factor(c(users$REGION))

#Factoring music column
users$MUSIC <- factor(c(users$MUSIC))

#Function to fix the timings in LIST_OWN and LIST_BACK
clean_timing <- function (t) {
  t = as.character(t)
  t[t == 'Less than an hour'] <- '.5';
  t[t == 'More than 16 hours'] <- '17';
  t <- as.numeric(substr(t, 1, 2));
  return(t)
}

users$LIST_OWN <- clean_timing(users$LIST_OWN)
users$LIST_BACK <- clean_timing(users$LIST_BACK)

#Writing the cleaned csv
write.csv(users, "cleaned_users.csv",row.names = FALSE)

