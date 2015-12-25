(function() {
	var providerName = 'unsplash.com';
	YoimgSearch.registerProvider({
		name : providerName,
		invoke : function(searchQuery, deferred) {
			jQuery.ajax({
				dataType : 'json',
				url : 'https://api.unsplash.com/photos/search',
				data : {
					query : searchQuery,
					client_id : '9ef2c07448af9026af654d8caade81260ef8682db05bded2483d83f104d48d33'
				},
				success : function(results) {
					var images = results && results.length ? results.map(function(i, index) {
						var author = i.user ? new YoimgSearchResultImageAuthor(i.user.name, i.user.username, i.user.links.html) : null;
						return new YoimgSearchResultImage(
								index,
								null,
								i.urls.full,
								null,
								i.urls.small,
								providerName,
								i.links.html,
								author);
					}) : [];
					var out = new YoimgSearchResult(providerName, images);
					deferred.resolve(out);
				},
				error : function(jqXHR, textStatus, errorThrown) {
					var messageFromServer = jqXHR.responseText;
					var error = new YoimgSearchResultError(textStatus, errorThrown, messageFromServer);
					var out = new YoimgSearchResult(providerName, [], error);
					deferred.reject(out);
				}
			});
		}
	});
})();