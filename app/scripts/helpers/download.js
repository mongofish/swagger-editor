'use strict';

PhonicsApp.value('downloadHelper', {
  getZipFile: function getZipFile(url, json){
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: url,
      data: JSON.stringify(json),
      processData: false
    }).then(function(data){
      if (data instanceof Object && data.code){
        window.location = 'http://generator.wordnik.com/online/api/gen/download/' + data.code;
      }
    });
  },

  assignDownloadHrefs: function assignDownloadHrefs($scope){
    var MIME_TYPE = 'text/plain';

    // JSON
    var jsonBlob = new Blob([$scope.jsonPreview.getSession().getValue()], {type: MIME_TYPE});
    $scope.jsonDownloadHref = window.URL.createObjectURL(jsonBlob);
    $scope.jsonDownloadUrl = [MIME_TYPE, 'spec.json', $scope.jsonDownloadHref].join(':');

    // YAML
    var yamlBlob = new Blob([$scope.editor.getSession().getValue()], {type: MIME_TYPE});
    $scope.yamlDownloadHref = window.URL.createObjectURL(yamlBlob);
    $scope.yamlDownloadUrl = [MIME_TYPE, 'spec.yaml', $scope.yamlDownloadHref].join(':');
  }
});
