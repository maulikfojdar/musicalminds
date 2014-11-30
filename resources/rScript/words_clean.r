words <- read.csv("words.csv")
sample_words <- read.csv("sample_words.csv")

rows1 <- is.na(sample_words)
sample_words[rows1] <- "0"

rows <- is.na(words$Good.Lyrics)
words$Good.Lyrics[rows] <- words$Good.lyrics[rows];
words$Good.lyrics <- NULL;

words$OWN_ARTIST_MUSIC <- as.character(words$OWN_ARTIST_MUSIC);
words$OWN_ARTIST_MUSIC[substr(words$OWN_ARTIST_MUSIC, 2, 2) == 'o'] <- 'Dont Know';
words$OWN_ARTIST_MUSIC <- factor(c(words$OWN_ARTIST_MUSIC))


words$HEARD_OF[words$HEARD_OF == ''] <- 'Never heard of';
words$HEARD_OF[words$HEARD_OF == 'Ever heard music by'] <- 'Heard of and listened to music EVER';
words$HEARD_OF[words$HEARD_OF == 'Ever heard of'] <- 'Heard of';
words$HEARD_OF[words$HEARD_OF == 'Listened to recently'] <- 'Heard of and listened to music RECENTLY';
words$HEARD_OF <- droplevels(words$HEARD_OF);
words$HEARD_OF <- factor(c(words$HEARD_OF));

write.csv(sample_words, file="sample_words.csv", row.names = FALSE)
write.csv(words, file="cleaned_words.csv", row.names = FALSE)

