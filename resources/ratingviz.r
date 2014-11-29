users <- read.csv("users.csv");
train <- read.csv("train.csv");

train_uttrsers <- merge(train, users, by.x="User", by.y="RESPID", all.x=T)
working <- c(levels(users$WORKING))
gender <- c(levels(users$GENDER))
region <- c(levels(users$REGION))

meanvalue<-c("10");

for(i in 2:14){
data <- subset(train_users$Rating, train_users$WORKING == working[[i]])
meanvalue[i] <- mean(data)
}

mean_gender <- c("10");

for(i in 1:2){
data <- subset(train_users$Rating, train_users$GENDER == gender[[i]])
mean_gender[i] <- mean(data)
}

mean_region <- c("10");

for(i in 2:7){
data <- subset(train_users$Rating, train_users$REGION == region[[i]])
mean_region[i] <- mean(data)
}

table_gender <- matrix(c(gender[[1]], mean_gender[1], gender[[2]], mean_gender[2]), ncol = 2)
table_gender <- t(table_gender)

table_region <- matrix(c(region[[2]], mean_region[2], region[[3]], mean_region[3], region[[4]], mean_region[4], region[[5]], mean_region[5], region[[6]], mean_region[6], region[[7]], mean_region[7]), ncol = 6)
table_region <- t(table_region)

table_working <- matrix(c(working[[2]],meanvalue[2],working[[3]],meanvalue[3],working[[4]],meanvalue[4],working[[5]],meanvalue[5],working[[6]],meanvalue[6],working[[7]],meanvalue[7],working[[8]],meanvalue[8],working[[9]],meanvalue[9],working[[10]],meanvalue[10],working[[11]],meanvalue[11],working[[12]],meanvalue[12],working[[13]],meanvalue[13],working[[14]],meanvalue[14]), ncol=13)
table_working <- t(table_working)

write.csv(table_gender,"ratinggender.csv",row.names=FALSE)
write.csv(table_working,"ratingworking.csv",row.names=FALSE)
write.csv(table_region,"ratingregion.csv",row.names=FALSE)


#sample <- read.csv("sample.csv")
#sample <- t(sample)
#ggdendrogram(hclust(dist(sample)), color = "tomato")