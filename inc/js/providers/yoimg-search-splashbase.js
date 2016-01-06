(function() {
	var providerName = 'splashbase.co';
	YoimgSearch.registerProvider({
		name : providerName,
		invoke : function(searchQuery, deferred, opts) {
			jQuery.ajax({
				dataType : 'json',
				url : 'http://www.splashbase.co/api/v1/images/search',
				data : {
					query : searchQuery
				},
				success : function(results) {
					var images = results && results.images && results.images.length > opts.itemsPerPage * opts.page ? results.images.slice(opts.itemsPerPage * opts.page, (opts.itemsPerPage * opts.page) + opts.itemsPerPage).map(function(i, index) {
						return new YoimgSearchResultImage(
								index,
								i.copyright,
								i.large_url,
								i.site,
								i.url,
								providerName,
								"http://www.splashbase.co/images/" + i.id,
								null);
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