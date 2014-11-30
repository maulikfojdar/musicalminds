users <- read.csv("users.csv");
words <- read.csv("words.csv");

users_words <-merge(words,users, by.x="User", by.y="RESPID",all.x=T)

female_records <- subset(users_words,users_words$GENDER == 0)

rows <- is.na(female_records)
female_records[rows] <- 0
output <- colSums(female_records)
write.csv(output,"wordFrequency.csv",row.names=TRUE)