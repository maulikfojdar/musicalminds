users <- read.csv("users.csv");
words <- read.csv("words.csv");

users_words <-merge(words,users, by.x="User", by.y="RESPID",all.x=T)

male_records <- subset(users_words,users_words$GENDER == 1)

rows <- is.na(male_records)
male_records[rows] <- 0
output <- colSums(male_records)
write.csv(output,"MaleWordFrequency.csv",row.names=TRUE)