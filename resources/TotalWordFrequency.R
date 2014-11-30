users <- read.csv("users.csv");
words <- read.csv("words.csv");

users_words <-merge(words,users, by.x="User", by.y="RESPID",all.x=T)


rows <- is.na(users_words)
users_words[rows] <- 0
output <- colSums(users_words)
write.csv(output,"TotalWordFrequency.csv",row.names=TRUE)